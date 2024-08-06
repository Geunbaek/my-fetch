import { describe, expect, it } from 'vitest';
import fetchIo from '../core/fetch-io';
import { users, type User } from './mocks/handlers';
import { FetchIoError } from '../core/fetch-io/index.type';

describe('fetch-io', () => {
  describe('GET Method', () => {
    it('request', async () => {
      const response = await fetchIo.get<User>('https://example.com/users');

      expect(response.status).toBe(200);
      expect(response.data).toEqual({ users });
    });

    it('request with query params', async () => {
      const response = await fetchIo.get<User>('https://example.com/users', {
        params: { firstName: '1' },
      });
      const filteredUsers = users.filter((user) => user.firstName === '1');
      expect(response.status).toBe(200);
      expect(response.data).toEqual({ users: filteredUsers });
    });

    it('request with params', async () => {
      const response = await fetchIo.get<User>('https://example.com/users/1');
      const user = users.find((user) => user.id === '1');
      expect(response.status).toBe(200);
      expect(response.data).toEqual({ user });
    });

    it('request with error', async () => {
      try {
        await fetchIo.get<User>('https://example.com/user/444');
      } catch (error) {
        expect((error as FetchIoError).status).toBe(404);
      }
    });
  });

  describe('POST Method', () => {
    it('request with body', async () => {
      const response = await fetchIo.post<User>('https://example.com/users', {
        body: {
          id: '3',
          firstName: 'park',
          lastName: 'baek',
        },
      });
      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        id: '3',
        firstName: 'park',
        lastName: 'baek',
      });
    });
    it('request with error', async () => {
      try {
        await fetchIo.post<User>('https://example.com/users', {
          body: {
            firstName: 'park',
            lastName: 'baek',
          },
        });
      } catch (error) {
        expect((error as FetchIoError).status).toBe(400);
      }
    });
  });

  describe('PUT Method', () => {
    it('request with body', async () => {
      const response = await fetchIo.put<User>('https://example.com/users', {
        body: {
          id: '3',
          firstName: 'park',
          lastName: 'baek',
        },
      });
      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        id: '3',
        firstName: 'park',
        lastName: 'baek',
      });
    });

    it('request with error', async () => {
      try {
        await fetchIo.put<User>('https://example.com/users', {
          body: {
            firstName: 'park',
            lastName: 'baek',
          },
        });
      } catch (error) {
        expect((error as FetchIoError).status).toBe(400);
      }
    });
  });

  describe('PATCH Method', () => {
    it('request with body', async () => {
      const response = await fetchIo.patch<User>('https://example.com/users', {
        body: {
          id: '1',
          firstName: 'park',
        },
      });
      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        user: {
          id: '1',
          firstName: 'park',
          lastName: 'Maverick',
        },
      });
    });
    it('request with error', async () => {
      try {
        await fetchIo.patch<User>('https://example.com/users', {
          body: {
            firstName: 'park',
            lastName: 'baek',
          },
        });
      } catch (error) {
        expect((error as FetchIoError).status).toBe(400);
      }
    });
  });

  describe('DELETE Method', () => {
    it('request with params', async () => {
      const response = await fetchIo.delete<User>(
        'https://example.com/users/1'
      );
      expect(response.status).toBe(200);
    });
    it('request with error', async () => {
      try {
        await fetchIo.delete<User>('https://example.com/users/2');
      } catch (error) {
        expect((error as FetchIoError).status).toBe(404);
      }
    });
  });

  describe('HEAD Method', () => {
    it('request', async () => {
      const response = await fetchIo.head<User>('https://example.com');
      expect(response.status).toBe(200);
    });
  });

  describe('OPTIONS Method', () => {
    it('request', async () => {
      const response = await fetchIo.options('https://example.com');
      expect(response.status).toBe(200);
    });
  });
});
