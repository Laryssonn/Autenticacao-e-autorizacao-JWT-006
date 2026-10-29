import { prismaClient } from '../libs/prismaClient';

interface IInput {
  roleId: string;
}

interface IOutput {
  permissionsCodes: string[];
}

export class GetRolePermissionsUseCase {
  async execute({ roleId }: IInput): Promise<IOutput> {
    const rolesPermissions = await prismaClient.rolePermission.findMany({
      where: { roleId },
      select: { permissionCode: true },
    });

    return {
      permissionsCodes: rolesPermissions.map(
        (rolePermission) => rolePermission.permissionCode,
      ),
    };
  }
}
