import jwt from 'jsonwebtoken';
import config from '@/config/app.config.js';
import { ErrorResponse } from '@/response/error.response';
import { errorCodes, errorMessages } from '@/response/httpResponse';
import { UNAUTHORIZED } from 'http-status';

export class JwtService {
  static generateToken = (data, expires, secret = config.jwt.secret) => {
    const token = jwt.sign(data, secret, { expiresIn: expires });
    return token;
  };

  static verifyToken = (token) => {
    let payload;
    jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) {
        throw new ErrorResponse(errorMessages.INVALID_TOKEN, UNAUTHORIZED, errorCodes.REQUIRED_TOKEN);
      }
      payload = decoded;
    });
    return payload;
  };
}
