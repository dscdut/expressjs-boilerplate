import db from '@/database/models';

export class UserRepository {
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
      role: 2,
    }).then((resultEntity) => resultEntity.get({ plain: true }));
    return createdUser;
  };
}
