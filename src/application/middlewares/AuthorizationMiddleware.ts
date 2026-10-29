import { IData, IMiddleware, IResponse } from '../interfaces/IMiddlaware';
import { IRequest } from '../interfaces/IRequest';
import { GetRolePermissionsUseCase } from '../useCases/GetRolePermissionsUseCase';

export class AuthorizationMiddleware implements IMiddleware {
  constructor(
    private readonly requiredPermissions: string[],
    private readonly getRolePermissionsUseCase: GetRolePermissionsUseCase,
  ) {}

  async handle({ account }: IRequest): Promise<IResponse | IData> {
    if (!account || !this.requiredPermissions.includes(account.role)) {
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
