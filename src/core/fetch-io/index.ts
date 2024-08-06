import type {
  FetchIoError,
  FetchIoMethod,
  FetchIoOptions,
  ResponseMessage,
} from './index.type';

abstract class IFetchIo {
  abstract get<T>(
    url: string,
    options?: FetchIoOptions
  ): Promise<ResponseMessage<T>>;

  abstract post<T>(
    url: string,
    options?: FetchIoOptions
  ): Promise<ResponseMessage<T>>;

  abstract put<T>(
    url: string,
    options?: FetchIoOptions
  ): Promise<ResponseMessage<T>>;

  abstract patch<T>(
    url: string,
    options?: FetchIoOptions
  ): Promise<ResponseMessage<T>>;

  abstract delete<T>(
    url: string,
    options?: FetchIoOptions
  ): Promise<ResponseMessage<T>>;

  abstract head<T>(
    url: string,
    options?: FetchIoOptions
  ): Promise<ResponseMessage<T>>;

  abstract options<T>(
    url: string,
    options?: FetchIoOptions
  ): Promise<ResponseMessage<T>>;
}

class FetchIo extends IFetchIo {
  private formatParams(params: Record<string, unknown>) {
    const formatedParams = Object.entries(params).reduce((acc, param) => {
      const [key, value] = param;
      return [...acc, `${key}=${value}`];
    }, [] as string[]);
    return '?' + formatedParams.join('&');
  }

  private async getDataByContentType(response: Response, contentType: string) {
    if (contentType.includes('application/json')) {
      return await response.json();
    } else if (contentType.includes('text/')) {
      return await response.text();
    } else if (contentType.includes('application/blob')) {
      return await response.blob();
    } else if (contentType.includes('application/octet-stream')) {
      return await response.arrayBuffer();
    } else if (contentType.includes('multipart/form-data')) {
      return await response.formData();
    } else {
      return await response.json();
    }
  }

  private async request<T>(
    method: FetchIoMethod,
    url: string,
    options?: FetchIoOptions
  ): Promise<ResponseMessage<T>> {
    try {
      const queryParam = options?.params
        ? this.formatParams(options?.params)
        : '';

      const response = await fetch(url + queryParam, {
        ...options,
        method,
        body: options?.body ? JSON.stringify(options.body) : null,
        signal: options?.timeout
          ? AbortSignal.timeout(options?.timeout)
          : undefined,
        headers: {
          'Content-Type': 'application/json',
          ...(options?.headers || {}),
        },
      });
      const contentType = response.headers.get('content-type') || '';

      const data = (await this.getDataByContentType(
        response,
        contentType
      )) as T;

      if (!response.ok) {
        throw { status: response.status, message: response.statusText };
      }

      return { status: response.status, data };
    } catch (error: unknown) {
      const response = error as FetchIoError;
      throw { status: response.status, error: response.message };
    }
  }

  get<T>(url: string, options?: FetchIoOptions) {
    return this.request<T>('get', url, options);
  }

  post<T>(url: string, options?: FetchIoOptions) {
    return this.request<T>('post', url, options);
  }

  put<T>(url: string, options?: FetchIoOptions) {
    return this.request<T>('put', url, options);
  }

  patch<T>(url: string, options?: FetchIoOptions) {
    return this.request<T>('patch', url, options);
  }

  delete<T>(url: string, options?: FetchIoOptions) {
    return this.request<T>('delete', url, options);
  }

  head<T>(url: string, options?: FetchIoOptions) {
    return this.request<T>('head', url, options);
  }

  options<T>(url: string, options?: FetchIoOptions) {
    return this.request<T>('options', url, options);
  }
}

const fetchIo = new FetchIo();
export default fetchIo;
