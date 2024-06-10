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
}
