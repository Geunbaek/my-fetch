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

export type { FetchIoMethod, ResponseMessage, FetchIoError, FetchIoOptions };
