import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

// Add handlers as your API grows
export const server = setupServer(
  http.post('/api/interview/start', async () =>
    HttpResponse.json({ id: 'mock-1' })
  )
);
