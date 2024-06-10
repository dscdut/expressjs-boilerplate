import pick from '@/utils/pick';
import { ErrorResponse } from '@/response/error.response';
import { errorCodes, errorMessages } from '@/response/httpResponse';
import { UserRepository } from '../repository';
import { CONFLICT, FORBIDDEN, NOT_FOUND } from 'http-status';
import { ROLES } from '@/enum';
import { Optional } from '@/utils/optional';
import { RoleService } from '@/modules/role/service';
import { PaginationResponseDto } from '@/core/pagination/dto/pagination.dto';

export class UserService {
  static findUserByEmail = async (email) => {
    return Optional.of(await UserRepository.findOneBy('email', email))
      .throwIfNotPresent(
        new ErrorResponse(errorMessages.RESOURCE_NOT_EXIST, NOT_FOUND, errorCodes.RESOURCE_NOT_EXIST, [
          errorMessages.INVALID_USER,
        ]),
      )
      .get();
  };

  static findUserById = async (id) => {
    return Optional.of(await UserRepository.findOneBy('id', id))
      .throwIfNotPresent(
        new ErrorResponse(errorMessages.RESOURCE_NOT_EXIST, NOT_FOUND, errorCodes.RESOURCE_NOT_EXIST, [
          errorMessages.INVALID_USER,
        ]),
      )
      .get();
  };

  static createUser = async (userDto) => {
    Optional.of(await UserRepository.findOneBy('email', userDto.email)).throwIfPresent(
      new ErrorResponse(errorMessages.DUPLICATE_EMAIL, CONFLICT, errorCodes.DUPLICATE_EMAIL),
    );
    const createdUser = await UserRepository.create(userDto);
    return pick(createdUser, ['id', 'full_name', 'email']);
  };

  static deleteUser = async (userId) => {
    const user = await this.findUserById(userId);

    if (user.role_id === ROLES.ADMIN.id) {
      throw new ErrorResponse(
        errorMessages.UNAUTHORIZED_DELETE_OTHER_ADMIN,
        FORBIDDEN,
        errorCodes.UNAUTHORIZED_DELETE_OTHER_ADMIN,
      );
    }
    await UserRepository.delete(userId);
  };

  static updateUser = async (id, updateUserDto, adminId = null) => {
    const user = await this.findUserById(id);

    if (user.email !== updateUserDto.email) {
      Optional.of(await UserRepository.findOneBy('email', updateUserDto.email)).throwIfPresent(
        new ErrorResponse(errorMessages.DUPLICATE_EMAIL, CONFLICT, errorCodes.DUPLICATE_EMAIL),
      );
    }

    if (adminId) {
      await RoleService.getRoleById(updateUserDto.role_id);

      if (user.role_id === ROLES.ADMIN.id && id !== adminId) {
        throw new ErrorResponse(
          errorMessages.UNAUTHORIZED_EDIT_OTHER_ADMIN,
          FORBIDDEN,
          errorCodes.UNAUTHORIZED_EDIT_OTHER_ADMIN,
        );
      }
    }

    if (adminId) {
      await RoleService.getRoleById(updateUserDto.role_id);

      if (user.role_id === ROLES.ADMIN.id && id !== adminId) {
        throw new ErrorResponse(
          errorMessages.UNAUTHORIZED_EDIT_OTHER_ADMIN,
          FORBIDDEN,
          errorCodes.UNAUTHORIZED_EDIT_OTHER_ADMIN,
        );
      }
    }

    await UserRepository.update(id, updateUserDto);
    return pick(await UserRepository.findOneBy('id', id), ['id', 'full_name', 'email', 'role']);
  };

  static getUsersPagination = async (paginationDto) => {
    const { page, page_size, search, sort } = paginationDto;
    return PaginationResponseDto(await UserRepository.getUsersPagination(page, page_size, search, sort));
  };
}
