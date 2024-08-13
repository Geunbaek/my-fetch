import { http, HttpResponse } from 'msw';
interface User {
  id: string;
  firstName: string;
  lastName: string;
}

const users: User[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Maverick',
  },
];

const handlers = [
  http.get('https://example.com/users', ({ request }) => {
    const url = new URL(request.url);

    const firstName = url.searchParams.get('firstName');

    let filteredUsers = users;
    if (firstName) {
      filteredUsers = users.filter((user) => user.firstName === firstName);
    }
    return HttpResponse.json({ users: filteredUsers });
  }),

  http.post<User>('https://example.com/user', async ({ request }) => {
    const url = new URL(request.url);

    const id = url.searchParams.get('id');
    const firstName = url.searchParams.get('firstName');
    const lastName = url.searchParams.get('lastName');

    if (!id || !firstName || !lastName) {
      return HttpResponse.json(null, { status: 400 });
    }

    return HttpResponse.json({
      user: {
        id,
        firstName,
        lastName,
      },
    });
  }),

  http.post<{}, User>('https://example.com/users', async ({ request }) => {
    const json = await request.json();
    const { id, firstName, lastName } = json;

    if (!id || !firstName || !lastName) {
      return HttpResponse.json(null, { status: 400 });
    }

    return HttpResponse.json({
      user: {
        id,
        firstName,
        lastName,
      },
    });
  }),

  http.put<{}, User>('https://example.com/users', async ({ request }) => {
    const json = await request.json();
    const { id, firstName, lastName } = json;

    if (!id || !firstName || !lastName) {
      return HttpResponse.json(null, { status: 400 });
    }

    return HttpResponse.json({
      user: {
        id,
        firstName,
        lastName,
      },
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

      return HttpResponse.json({ user }, { status: 200 });
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

  // TODO: formData parsing error
  // http.post<{}, User>(
  //   'https://example.com/form-data/users',
  //   async ({ request }) => {
  //     const data = await request.formData();

  //     const id = data.get('id');
  //     const firstName = data.get('firstName');
  //     const lastName = data.get('lastName');

  //     if (!id || !firstName || !lastName) {
  //       return HttpResponse.json(null, { status: 400 });
  //     }

  //     return HttpResponse.json({
  //       user: {
  //         id,
  //         firstName,
  //         lastName,
  //       },
  //     });
  //   }
  // ),
];

export type { User };
export { users, handlers };
