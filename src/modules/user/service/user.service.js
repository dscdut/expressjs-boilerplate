import pick from '@/utils/pick';
import { ErrorResponse } from '@/response/error.response';
import { errorCodes, errorMessages } from '@/response/httpResponse';
import { UserRepository } from '../repository';
import { CONFLICT } from 'http-status';

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
}
