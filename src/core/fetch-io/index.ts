type FetchIoMethod =
  | 'get'
  | 'post'
  | 'put'
  | 'patch'
  | 'delete'
  | 'head'
  | 'options';

type FetchIoOptions = Omit<RequestInit, 'body'> & {
  params?: Record<string, unknown>;
  timeout?: number | null;
  body?: Record<string, unknown> | BodyInit;
};

interface FetchIoError {
  status: number;
  message: string;
}

interface ResponseMessage<T> {
  status: number;
  data?: T;
  error?: string;
}

interface IFetchIo {
  get<T>(url: string, options?: FetchIoOptions): Promise<ResponseMessage<T>>;
  post<T>(url: string, options?: FetchIoOptions): Promise<ResponseMessage<T>>;
  put<T>(url: string, options?: FetchIoOptions): Promise<ResponseMessage<T>>;
  patch<T>(url: string, options?: FetchIoOptions): Promise<ResponseMessage<T>>;
  delete<T>(url: string, options?: FetchIoOptions): Promise<ResponseMessage<T>>;
  head<T>(url: string, options?: FetchIoOptions): Promise<ResponseMessage<T>>;
  options<T>(
    url: string,
    options?: FetchIoOptions
  ): Promise<ResponseMessage<T>>;
}

const isBodyInit = (
  value: Record<string, unknown> | BodyInit
): value is BodyInit => {
  return (
    typeof value === 'string' ||
    ArrayBuffer.isView(value) ||
    value instanceof Blob ||
    value instanceof ArrayBuffer ||
    value instanceof FormData ||
    value instanceof URLSearchParams ||
    value instanceof ReadableStream
  );
};

const formatParams = (params: Record<string, unknown>) => {
  const formatedParams = Object.entries(params).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: new String(value) }),
    {}
  );
  return new URLSearchParams(formatedParams).toString();
};

const getDataByContentType = async <T>(
  response: Response,
  contentType: string
) => {
  if (contentType.includes('application/json')) {
    return (await response.json()) as T;
  } else if (contentType.includes('text/')) {
    return (await response.text()) as T;
  } else if (contentType.includes('application/blob')) {
    return (await response.blob()) as T;
  } else if (contentType.includes('application/octet-stream')) {
    return (await response.arrayBuffer()) as T;
  } else if (contentType.includes('multipart/form-data')) {
    return (await response.formData()) as T;
  } else {
    return (await response.json()) as T;
  }
};

const request = async <T>(
  method: FetchIoMethod,
  url: string,
  options?: FetchIoOptions
): Promise<ResponseMessage<T>> => {
  try {
    const queryParam = options?.params ? formatParams(options?.params) : '';

    const body = options?.body
      ? isBodyInit(options.body)
        ? options.body
        : JSON.stringify(options.body)
      : null;

    const response = await fetch(`${url}?${queryParam}`, {
      ...options,
      method,
      body,
      signal: options?.timeout
        ? AbortSignal.timeout(options.timeout)
        : undefined,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });
    const contentType = response.headers.get('content-type') || '';

    const data = await getDataByContentType<T>(response, contentType);

    if (!response.ok) {
      throw { status: response.status, message: response.statusText };
    }

    return { status: response.status, data };
  } catch (error: unknown) {
    const response = error as FetchIoError;
    throw { status: response.status, error: response.message };
  }
};

const fetchIo: IFetchIo = {
  get: <T>(url: string, options?: FetchIoOptions) => {
    return request<T>('get', url, options);
  },

  post: <T>(url: string, options?: FetchIoOptions) => {
    return request<T>('post', url, options);
  },

  put: <T>(url: string, options?: FetchIoOptions) => {
    return request<T>('put', url, options);
  },

  patch: <T>(url: string, options?: FetchIoOptions) => {
    return request<T>('patch', url, options);
  },

  delete: <T>(url: string, options?: FetchIoOptions) => {
    return request<T>('delete', url, options);
  },

  head: <T>(url: string, options?: FetchIoOptions) => {
    return request<T>('head', url, options);
  },

  options: <T>(url: string, options?: FetchIoOptions) => {
    return request<T>('options', url, options);
  },
};

export type { FetchIoError };
export default fetchIo;
