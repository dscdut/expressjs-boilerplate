import db from '@/database/models';
import { ROLES } from '@/enum';

export class UserRepository {
  static findOneBy = async (column, value) => {
    const user = await db.User.findOne({
      where: { [column]: value },
      include: [
        {
          model: db.Role,
          require: true,
          as: 'role',
          attributes: ['id', 'name'],
        },
      ],
      raw: true,
      nest: true,
    });

    return user;
  };

  static create = async (userDto) => {
    const createdUser = await db.User.create({ ...userDto, role_id: ROLES.MEMBER.id }).then((resultEntity) =>
      resultEntity.get({ plain: true }),
    );
    return createdUser;
  };

  static matchPassword = async (password, instance) => {
    return await db.User.matchPassword(password, instance);
  };

  static delete = async (id) => {
    return await db.User.destroy({
      where: { id: id },
    });
  };

  static update = async (id, userDto) => {
    const result = await db.User.update(userDto, {
      where: { id: id },
      returning: true,
    });

    if (result[0] === 1) {
      return result[1][0];
    }
    return null;
  };

  static delete = async (id) => {
    await db.User.destroy({
      where: { id: id },
    });
  };

  static update = async (id, userDto) => {
    const result = await db.User.update(userDto, {
      where: { id: id },
      returning: true,
    });

    if (result[0] === 1) {
      return result[1][0];
    }
    return null;
  };
}
