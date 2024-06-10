import pick from '@/utils/pick';
import { ErrorResponse } from '@/response/error.response';
import { statusCodes, errorCodes, errorPharses } from '@/response/httpResponse';
import { UserRepository } from '../repository';

export class UserService {
  static getUserByEmail = async (email) => {
    const user = await UserRepository.findOneBy('email', email);
    return user;
  };

  static createUser = async (userDto) => {
    const user = await this.getUserByEmail(userDto.email);
    if (user) {
      throw new ErrorResponse(errorPharses.DUPILICATE_EMAIL, statusCodes.CONFLICT, errorCodes.DUPILICATE_EMAIL);
    }

    const createdUser = await UserRepository.create(userDto);

    return pick(createdUser, ['id', 'full_name', 'email']);
  };
}
