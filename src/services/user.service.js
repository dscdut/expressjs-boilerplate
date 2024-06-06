import db from '@/database/models';
import { ErrorResponse } from '@/response/error.response';
import pick from '@/utils/pick';
import roleService from './role.service';
import { errorCode, statusCodes } from '@/response/httpResponse';
import { ROLES } from '@/enum';

class userService {
  static getUserByField = async (field, value) => {
    const user = await db.User.findOne({
      where: { [field]: value },
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

  static createUser = async (userDto) => {
    const user = await this.getUserByField('email', userDto.email);
    const isMatchPassword = userDto.password === userDto.confirm_password;
    let err_code;

    if (user) {
      err_code = 108;
      throw new ErrorResponse(errorCode[err_code], statusCodes.CONFLICT, err_code);
    }

    if (!isMatchPassword) {
      err_code = 104;
      throw new ErrorResponse(errorCode[err_code], statusCodes.BAD_REQUEST, err_code);
    }

    const isExistRole = await roleService.checkExistRole(userDto.role);
    if (!isExistRole) {
      err_code = 104;
      throw new ErrorResponse(errorCode[err_code], statusCodes.BAD_REQUEST, err_code);
    }

    const createdUser = await db.User.create({
      full_name: userDto.full_name,
      email: userDto.email,
      password: userDto.password,
      role: userDto.role,
    }).then((resultEntity) => resultEntity.get({ plain: true }));

    return pick(createdUser, ['id', 'full_name', 'email', 'password', 'role']);
  };

  static deleteUserById = async (userId, me) => {
    let err_code;
    const isAdmin = me.role === ROLES.IS_ADMIN.id;

    if (userId === me.id || isAdmin) {
      const deletedUser = await db.User.destroy({
        where: { id: userId },
      });
      if (!deletedUser) {
        err_code = 112;
        throw new ErrorResponse(errorCode[err_code], statusCodes.NOT_FOUND, err_code);
      }
      return { message: 'Deleted a user' };
    } else {
      err_code = 113;
      throw new ErrorResponse(errorCode[err_code], statusCodes.FORBIDDEN, err_code);
    }
  };
}

export default userService;
