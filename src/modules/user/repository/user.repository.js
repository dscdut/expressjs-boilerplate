import db from '@/database/models';
import { ROLES } from '@/enum';

export class UserRepository {
  static isExist = async (column, value) => {
    const exist = await db.User.count({
      where: {
        [column]: value,
      },
    });
    return exist > 0;
  };

  static findOneBy = async (column, value) => {
    const user = await db.User.findOne({
      where: { [column]: value },
      include: [
        {
          model: db.Role,
          require: true,
          as: 'roleData',
          attributes: ['id', 'name'],
        },
      ],
      raw: true,
      nest: true,
    });

    return user;
  };

  static create = async (userDto) => {
    const createdUser = await db.User.create({
      full_name: userDto.full_name,
      email: userDto.email,
      password: userDto.password,
      role_id: ROLES.IS_MEMBER.id,
    }).then((resultEntity) => resultEntity.get({ plain: true }));
    return createdUser;
  };

  static matchPassword = async (password, instance) => {
    const isMatchPassword = await db.User.matchPassword(password, instance);
    return isMatchPassword;
  };

  static delete = async (id) => {
    await db.User.destroy({
      where: { id: id },
    });
  };
}
