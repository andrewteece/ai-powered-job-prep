import { ReactNode } from 'react';
import { ClerkProvider as OriginalClerkProvider } from '@clerk/nextjs';

export function ClerkProvider({
  children,
  ...props
}: { children: ReactNode } & React.ComponentProps<typeof OriginalClerkProvider>) {
  return <OriginalClerkProvider {...props}>{children}</OriginalClerkProvider>;
}
