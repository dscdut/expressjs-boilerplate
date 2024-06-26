import db from '@/database/models';

export class RoleRepository {
  static findOneBy = async (column, value) => {
    const role = await db.Role.findOne({
      where: { [column]: value },
    });
    return role;
  };

  static getRoles = async () => {
    return db.Role.findAll();
  };

  static checkExistRole = async (roleId) => {
    const roles = await this.getRoles();
    return roles.some((role) => role.id === roleId);
  };
}
