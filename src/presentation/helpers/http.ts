import { ServerError } from '../exceptions';

export type HttpResponse<T = any> = {
  statusCode: number;
  data: T;
};

export const serverError = (error: Error): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error),
});

export const ok = <T = any>(data: T): HttpResponse<T> => ({
  statusCode: 200,
  data,
});

export const created = <T = any>(data: T): HttpResponse<T> => ({
  statusCode: 201,
  data,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  data: {},
});

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error,
});

export const unauthorized = (error: Error): HttpResponse<Error> => ({
  statusCode: 401,
  data: error,
});

export const forbidden = (error: Error): HttpResponse<Error> => ({
  statusCode: 403,
  data: error,
});
