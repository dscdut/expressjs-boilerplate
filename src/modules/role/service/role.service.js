import { Optional } from '@/utils/optional';
import { RoleRepository } from '../repository';
import { errorCodes, errorMessages } from '@/response/httpResponse';
import { BAD_REQUEST } from 'http-status';
import { ErrorResponse } from '@/response/error.response';

export class RoleService {
  static getRoleById = async (roleId) => {
    return Optional.of(await RoleRepository.findOneBy('id', roleId))
      .throwIfNotPresent(
        new ErrorResponse(errorMessages.INVALID_SYNTAX, BAD_REQUEST, errorCodes.INVALID_SYNTAX, [
          errorMessages.INVALID_ROLE,
        ]),
      )
      .get();
  };

  static getRoleByName = async (name) => {
    const role = await RoleRepository.findOneBy('name', name);
    return role;
  };

  static getRoles = async () => {
    return RoleRepository.getRoles();
  };
}
