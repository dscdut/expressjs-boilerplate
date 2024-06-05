import db from '@/database/models';
import { ErrorResponse } from '@/response/error.response';
import pick from '@/utils/pick';
import roleService from './role.service';
import { errorCode, statusCodes } from '@/response/httpResponse';

class userService {
  static getUserByEmail = async (email) => {
    const user = await db.User.findOne({
      where: { email },
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
    const user = await this.getUserByEmail(userDto.email);
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
}

export default userService;
