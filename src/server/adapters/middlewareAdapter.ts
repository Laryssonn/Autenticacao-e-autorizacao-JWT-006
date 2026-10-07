import { NextFunction, Request, Response } from 'express';
import { IMiddleware } from '../../application/interfaces/IMiddlaware';

export function middlewareAdapter(middlare: IMiddleware) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const result = await middlare.handle({
      headers: request.headers as Record<string, string>,
    });

    if ('statusCode' in result) {
      response.status(result.statusCode).json(result.body);
    }

    if ('data' in result) {
      request.metadata = {
        ...request.metadata,
        ...result.data,
      };
    }

    next();
  };
}
