import { http, HttpResponse } from 'msw';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export const users: User[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Maverick',
  },
];

export const handlers = [
  http.get('https://example.com/users', () => {
    return HttpResponse.json({ users });
  }),

  http.get<Pick<User, 'id'>>('https://example.com/users/:id', ({ params }) => {
    const { id } = params;

    const user = users.find((user) => user.id === id);
    if (!user) return HttpResponse.json(null, { status: 404 });
    return HttpResponse.json({ user });
  }),

  http.post<{}, User>('https://example.com/users', async ({ request }) => {
    const json = await request.json();
    const { id, firstName, lastName } = json;

    if (!id || !firstName || !lastName) {
      return HttpResponse.json(null, { status: 400 });
    }

    return HttpResponse.json({
      id,
      firstName,
      lastName,
    });
  }),

  http.put<{}, User>('https://example.com/users', async ({ request }) => {
    const json = await request.json();
    const { id, firstName, lastName } = json;

    if (!id || !firstName || !lastName) {
      return HttpResponse.json(null, { status: 400 });
    }

    return HttpResponse.json({
      id,
      firstName,
      lastName,
    });
  }),

  http.patch<{}, Partial<User>>(
    'https://example.com/users',
    async ({ request }) => {
      const json = await request.json();
      const { id, firstName, lastName } = json;

      if (!id) {
        return HttpResponse.json(null, { status: 400 });
      }

      if (!firstName && !lastName) {
        return HttpResponse.json(null, { status: 400 });
      }

      const user = users.find((user) => user.id === id);

      if (!user) {
        return HttpResponse.json(null, { status: 404 });
      }

      return HttpResponse.json({
        user: {
          id,
          firstName: firstName ?? user.firstName,
          lastName: lastName ?? user.lastName,
        },
      });
    }
  ),

  http.delete<Pick<User, 'id'>>(
    'https://example.com/users/:id',
    async ({ params }) => {
      const { id } = params;

      if (!id) {
        return HttpResponse.json(null, { status: 400 });
      }

      const user = users.find((user) => user.id === id);

      if (!user) {
        return HttpResponse.json(null, { status: 404 });
      }

      return HttpResponse.json(null, { status: 200 });
    }
  ),

  http.head('https://example.com', () => {
    return HttpResponse.json(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': '1270',
        'Last-Modified': 'Mon, 13 Jul 2020 15:00:00 GMT',
      },
    });
  }),

  http.options('https://example.com', () => {
    return HttpResponse.json(null, {
      status: 200,
      headers: {
        Allow: 'GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS',
      },
    });
  }),
];
