import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from '../config/env';
import { IData, IMiddleware, IResponse } from '../interfaces/IMiddlaware';
import { IRequest } from '../interfaces/IRequest';

export class AuthenticationMiddleware implements IMiddleware {
  async handle({ headers }: IRequest): Promise<IResponse | IData> {
    const { authorization } = headers;

    if (!authorization?.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        body: {
          error: 'Token não informado',
        },
      };
    }

    try {
      const token = authorization.split(' ')[1];

      if (!token) {
        throw new Error();
      }

      const payload = jwt.verify(token, env.jwtSecret) as JwtPayload;
      return {
        data: {
          account: {
            id: payload.sub,
            role: payload.role,
          },
        },
      };
    } catch {
      return {
        statusCode: 401,
        body: null,
      };
    }
  }
}
