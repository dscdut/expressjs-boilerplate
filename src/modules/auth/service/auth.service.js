import { UserService } from '@/modules/user/service';
import { JwtService } from './jwt.service';
import { errorCodes, errorMessages } from '@/response/httpResponse';
import { UserRepository } from '@/modules/user/repository';
import config from '@/config/app.config';
import pick from '@/utils/pick';
import { ErrorResponse } from '@/response/error.response';
import { UNAUTHORIZED } from 'http-status';

export class AuthService {
  static register = async (userDto) => {
    const user = await UserService.createUser(userDto);
    return user;
  };

  static login = async (loginDto) => {
    const user = await UserRepository.findOneBy('email', loginDto.email);
    const isMatchPassword = user ? await UserRepository.matchPassword(loginDto.password, user) : false;

    if (!user || !isMatchPassword) {
      throw new ErrorResponse(errorMessages.LOGIN_FAILED, UNAUTHORIZED, errorCodes.LOGIN_FAILED);
    }

    const expires = config.jwt.accessExpiration;
    const accessToken = JwtService.generateToken(pick(user, ['id', 'email', 'role_id']), expires);
    return { access_token: accessToken };
  };
}
