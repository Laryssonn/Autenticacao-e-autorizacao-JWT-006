import { IData, IMiddleware, IResponse } from '../interfaces/IMiddlaware';
import { IRequest } from '../interfaces/IRequest';

export class AuthorizationMiddleware implements IMiddleware {
  constructor(private readonly allowedRoles: string[]) {}

  async handle({ account }: IRequest): Promise<IResponse | IData> {
    if (!account || !this.allowedRoles.includes(account.role)) {
      return {
        body: {
          error: 'Access Denied.',
        },
        statusCode: 403,
      };
    }

    return { data: {} };
  }
}
