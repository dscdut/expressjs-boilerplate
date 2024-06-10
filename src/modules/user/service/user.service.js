import pick from '@/utils/pick';
import { ErrorResponse } from '@/response/error.response';
import { statusCodes, errorCodes, errorMessages } from '@/response/httpResponse';
import { UserRepository } from '../repository';
import { ROLES } from '@/enum';
import { RoleRepository } from '@/modules/role/repository';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/enum';

export class UserService {
  static getUserByEmail = async (email) => {
    const user = await UserRepository.findOneBy('email', email);
    return user;
  };

  static createUser = async (userDto) => {
    const isExistEmail = await UserRepository.isExist('email', userDto.email);
    if (isExistEmail) {
      throw new ErrorResponse(errorMessages.DUPILICATE_EMAIL, statusCodes.CONFLICT, errorCodes.DUPILICATE_EMAIL);
    }

    const createdUser = await UserRepository.create(userDto);

    return pick(createdUser, ['id', 'full_name', 'email']);
  };

  static deleteUser = async (userId) => {
    const user = await UserRepository.findOneBy('id', userId);

    if (!user) {
      throw new ErrorResponse(errorMessages.RESOURCE_NOT_EXIST, statusCodes.NOT_FOUND, errorCodes.RESOURCE_NOT_EXIST, [
        errorMessages.INVALID_USER,
      ]);
    }
    if (user.role_id === ROLES.IS_ADMIN.id) {
      throw new ErrorResponse(
        errorMessages.UNAUTHORIZED_DELETE_OTHER_ADMIN,
        statusCodes.FORBIDDEN,
        errorCodes.UNAUTHORIZED_DELETE_OTHER_ADMIN,
      );
    }
    await UserRepository.delete(userId);
  };

  static updateUser = async (id, updateUserDto, adminId = null) => {
    const user = await UserRepository.findOneBy('id', id);

    if (!user)
      throw new ErrorResponse(errorMessages.RESOURCE_NOT_EXIST, statusCodes.NOT_FOUND, errorCodes.RESOURCE_NOT_EXIST, [
        errorMessages.INVALID_USER,
      ]);

    if (user.email !== updateUserDto.email) {
      const isExistEmail = await UserRepository.isExist('email', updateUserDto.email);
      if (isExistEmail) {
        throw new ErrorResponse(errorMessages.DUPILICATE_EMAIL, statusCodes.CONFLICT, errorCodes.DUPILICATE_EMAIL);
      }
    }

    if (adminId) {
      const isExistRole = await RoleRepository.checkExistRole(updateUserDto.role_id);

      if (!isExistRole) {
        throw new ErrorResponse(errorMessages.INVALID_SYNTAX, statusCodes.BAD_REQUEST, errorCodes.INVALID_SYNTAX, [
          errorMessages.INVALID_ROLE,
        ]);
      }

      if (user.role_id === ROLES.IS_ADMIN.id && id !== adminId) {
        throw new ErrorResponse(
          errorMessages.UNAUTHORIZED_EDIT_OTHER_ADMIN,
          statusCodes.FORBIDDEN,
          errorCodes.UNAUTHORIZED_EDIT_OTHER_ADMIN,
        );
      }
    }

    await UserRepository.update(id, updateUserDto);

    return pick(await UserRepository.findOneBy('id', id), ['id', 'full_name', 'email', 'role']);
  };

  static getUsers = async (paginateDto) => {
    const page_size = paginateDto.page_size || DEFAULT_PAGE_SIZE;
    const page = paginateDto.page || DEFAULT_PAGE;
    const users = await UserRepository.getUsers(page, page_size);

    return {
      total: users.count,
      data: users.rows,
    };
  };
}
