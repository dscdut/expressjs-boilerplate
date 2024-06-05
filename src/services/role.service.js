import db from '@/database/models';

class roleService {
  static getRoleById = async (roleId) => {
    const role = await db.Role.findOne({
      where: { id: roleId },
    });

    return role;
  };

  static getRoleByName = async (name) => {
    const role = await db.Role.findOne({
      where: { name },
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

export default roleService;
