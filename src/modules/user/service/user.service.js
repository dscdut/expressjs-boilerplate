import pick from '@/utils/pick';
import { ErrorResponse } from '@/response/error.response';
import { errorCodes, errorMessages } from '@/response/httpResponse';
import { UserRepository } from '../repository';
import { CONFLICT, FORBIDDEN, NOT_FOUND } from 'http-status';
import { ROLES } from '@/enum';

export class UserService {
  static getUserByEmail = async (email) => {
    const user = await UserRepository.findOneBy('email', email);
    return user;
  };

  static createUser = async (userDto) => {
    const isExistEmail = await UserRepository.findOneBy('email', userDto.email);
    if (isExistEmail) {
      throw new ErrorResponse(errorMessages.DUPLICATE_EMAIL, CONFLICT, errorCodes.DUPLICATE_EMAIL);
    }

    const createdUser = await UserRepository.create(userDto);
    return pick(createdUser, ['id', 'full_name', 'email']);
  };

  static deleteUser = async (userId) => {
    const user = await UserRepository.findOneBy('id', userId);

    if (!user) {
      throw new ErrorResponse(errorMessages.RESOURCE_NOT_EXIST, NOT_FOUND, errorCodes.RESOURCE_NOT_EXIST, [
        errorMessages.INVALID_USER,
      ]);
    }
    if (user.role_id === ROLES.ADMIN.id) {
      throw new ErrorResponse(
        errorMessages.UNAUTHORIZED_DELETE_OTHER_ADMIN,
        FORBIDDEN,
        errorCodes.UNAUTHORIZED_DELETE_OTHER_ADMIN,
      );
    }
    await UserRepository.delete(userId);
  };
}
