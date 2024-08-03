type FetchIoMethod =
  | 'get'
  | 'post'
  | 'put'
  | 'patch'
  | 'delete'
  | 'head'
  | 'options';

type FetchIoOptions = RequestInit & {
  params?: Record<string, unknown>;
  timeout?: number;
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
