import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from '../config/env';
import {
  IData,
  IMiddleware,
  IRequest,
  IResponse,
} from '../interfaces/IMiddlaware';

export class AuthenticationMiddleware implements IMiddleware {
  async handle(request: IRequest): Promise<IResponse | IData> {
    const { authorization } = request.headers;

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
