import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';

// ---- MSW (optional but recommended) ----
import { server } from './server';

// Start/stop mock server (node)
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// ---- Next.js shims/mocks you’ll likely need ----
vi.mock('next/navigation', () => {
  return {
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
    }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
  };
});
