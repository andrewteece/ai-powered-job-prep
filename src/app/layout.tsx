import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';

export const metadata: Metadata = { title: 'AI-Powered Job Prep' };

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
if (!publishableKey) throw new Error('Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClerkProvider publishableKey={publishableKey}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
