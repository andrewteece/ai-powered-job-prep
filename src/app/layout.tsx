// src/app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';

export const metadata: Metadata = { title: 'AI-Powered Job Prep' };

// Read on the server; OK for NEXT_PUBLIC_*
const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
if (!publishableKey) throw new Error('Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="en" suppressContentEditableWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableColorScheme
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
