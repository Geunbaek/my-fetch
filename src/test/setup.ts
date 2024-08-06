import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';
import { afterAll, beforeAll } from 'vitest';
import { afterEach } from 'node:test';

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
