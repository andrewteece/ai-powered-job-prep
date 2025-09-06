import { deleteUser, upsertUser } from '@/features/users/db';
import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';
import { Webhook } from 'svix';

export async function POST(request: NextRequest) {
  // Get the webhook signature from the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, return an error
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing svix headers', { status: 400 });
  }

  // Get the webhook secret
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('CLERK_WEBHOOK_SECRET is not defined');
    return new Response('Webhook secret not configured', { status: 500 });
  }

  // Get the body
  const payload = await request.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret
  const svix = new Webhook(webhookSecret);

  try {
    // Verify the webhook
    const event = svix.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;

    // Process the webhook event
    switch (event.type) {
      case 'user.created':
      case 'user.updated':
        const clerkData = event.data;
        const email = clerkData.email_addresses?.find(
          (e) => e.id === clerkData.primary_email_address_id,
        )?.email_address;

        if (email == null) {
          return new Response('No primary email found', { status: 400 });
        }

        await upsertUser({
          id: clerkData.id,
          email,
          name: `${clerkData.first_name} ${clerkData.last_name}`,
          imageUrl: clerkData.image_url,
          createdAt: new Date(clerkData.created_at),
          updatedAt: new Date(clerkData.updated_at),
        });

        break;
      case 'user.deleted':
        if (event.data.id == null) {
          return new Response('No user ID found', { status: 400 });
        }

        await deleteUser(event.data.id);
        break;
    }

    return new Response('Webhook received', { status: 200 });
  } catch (error) {
    console.error('Error verifying webhook:', error);
    return new Response('Invalid webhook', { status: 400 });
  }
}
