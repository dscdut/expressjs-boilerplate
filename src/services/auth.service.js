import db from '@/database/models';
import userService from './user.service';
import { ErrorResponse } from '@/response/error.response';
import { errorCode } from '@/response/httpResponse';
import statusCode from '@/response/httpResponse/statusCode';
import config from '@/config/app.config.js';
import { jwtService } from './jwt.service';
import pick from '@/utils/pick';

class authService {
  static login = async (email, password) => {
    const user = await userService.getUserByEmail(email);
    const isMatchPassword = user ? await db.User.matchPassword(password, user) : false;
    let err_code;
    if (!user || !isMatchPassword) {
      err_code = 102;
      throw new ErrorResponse(errorCode[err_code], statusCode.UNAUTHORIZED, err_code);
    }

    const expiresMs = jwtService.generateExpires(config.jwt.accessExpirationMinutes / 60);
    const accessToken = jwtService.generateToken(pick(user, ['id', 'full_name', 'email', 'role']), expiresMs);
    return { access_token: accessToken };
  };
}

export default authService;
