import { describe, expect, it } from 'vitest';
import fetchIo, { FetchIoError } from '../core/fetch-io';
import { users, type User } from './mocks/handlers';

describe('fetch-io', () => {
  describe('GET Method', () => {
    it('올바른 데이터를 반환한다.', async () => {
      const response = await fetchIo.get<User>('https://example.com/users');

      expect(response.status).toBe(200);
      expect(response.data).toEqual({ users });
    });

    it('query params는 정상적으로 서버에 전달되고, 올바른 데이터를 반환한다.', async () => {
      const response = await fetchIo.get<User>('https://example.com/users', {
        params: { firstName: 'John' },
      });
      const filteredUsers = users.filter((user) => user.firstName === 'John');
      expect(response.status).toBe(200);
      expect(response.data).toEqual({ users: filteredUsers });
    });

    it('올바르지 않은 경로로의 요청은 에러를 반환한다.', async () => {
      try {
        await fetchIo.get<User>('https://example.com/user');
      } catch (error) {
        expect((error as FetchIoError).status).toBe(404);
      }
    });
  });

  describe('POST Method', () => {
    it('객체 형태의 body는 정상적으로 서버에 전달되고, 올바른 데이터를 반환한다.', async () => {
      const response = await fetchIo.post<User>('https://example.com/users', {
        body: {
          id: '3',
          firstName: 'park',
          lastName: 'baek',
        },
      });
      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        user: {
          id: '3',
          firstName: 'park',
          lastName: 'baek',
        },
      });
    });

    it('query params는 정상적으로 서버에 전달되고, 올바른 데이터를 반환한다.', async () => {
      const response = await fetchIo.post<User>('https://example.com/user', {
        params: { id: '3', firstName: 'park', lastName: 'baek' },
      });
      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        user: { id: '3', firstName: 'park', lastName: 'baek' },
      });
    });

    it('정상적인 요청이 아닐 경우 서버에서 전달한 에러를 반환한다.', async () => {
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

    // TODO: formData parsing error
    // it('formData 형태의 body는 정상적으로 서버에 전달되고, 올바른 데이터를 반환한다.', async () => {
    //   const formData = new FormData();
    //   formData.append('id', '311');
    //   formData.append('firstName', 'park');
    //   formData.append('lastName', 'baek');

    //   const response = await fetchIo.post<User>(
    //     'https://example.com/form-data/users',
    //     {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //       body: formData,
    //     }
    //   );

    //   expect(response.status).toBe(200);
    //   expect(response.data).toEqual({
    //     user: {
    //       id: '3',
    //       firstName: 'park',
    //       lastName: 'baek',
    //     },
    //   });
    // });
  });

  describe('PUT Method', () => {
    it('객체 형태의 body는 정상적으로 서버에 전달되고, 올바른 데이터를 반환한다.', async () => {
      const response = await fetchIo.put<User>('https://example.com/users', {
        body: {
          id: '3',
          firstName: 'park',
          lastName: 'baek',
        },
      });
      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        user: {
          id: '3',
          firstName: 'park',
          lastName: 'baek',
        },
      });
    });

    it('정상적인 요청이 아닐 경우 서버에서 전달한 에러를 반환한다.', async () => {
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
    it('객체 형태의 body는 정상적으로 서버에 전달되고, 올바른 데이터를 반환한다.', async () => {
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

    it('정상적인 요청이 아닐 경우 서버에서 전달한 에러를 반환한다.', async () => {
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
    it('객체 형태의 body는 정상적으로 서버에 전달되고, 올바른 데이터를 반환한다.', async () => {
      const response = await fetchIo.delete<User>(
        'https://example.com/users/1',
        {
          body: {
            id: '1',
            firstName: 'John',
            lastName: 'Maverick',
          },
        }
      );
      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        user: { id: '1', firstName: 'John', lastName: 'Maverick' },
      });
    });

    it('올바르지 않은 요청은 에러를 반환한다.', async () => {
      try {
        await fetchIo.delete<User>('https://example.com/users/2');
      } catch (error) {
        expect((error as FetchIoError).status).toBe(404);
      }
    });
  });

  describe('HEAD Method', () => {
    it('정상적인 상태코드를 반환한다.', async () => {
      const response = await fetchIo.head<User>('https://example.com');
      expect(response.status).toBe(200);
    });
  });

  describe('OPTIONS Method', () => {
    it('정상적인 상태코드를 반환한다.', async () => {
      const response = await fetchIo.options('https://example.com');
      expect(response.status).toBe(200);
    });
  });
});
