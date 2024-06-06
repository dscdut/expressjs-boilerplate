import jwt from 'jsonwebtoken';
import config from '@/config/app.config.js';
import { ErrorResponse } from '@/response/error.response';
import { statusCodes } from '@/response/httpResponse';

export class jwtService {
  static generateToken = (data, expires, secret = config.jwt.secret) => {
    const token = jwt.sign(data, secret, { expiresIn: expires });
    return token;
  };

  static verifyToken = (token) => {
    let payload;
    jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) {
        let err_code = 104;
        throw new ErrorResponse(err.message, statusCodes.UNAUTHORIZED, err_code);
      }
      payload = decoded;
    });
    return payload;
  };

  static generateExpires = (hours) => {
    const ms = Math.floor(Date.now() + hours * 60 * 60 * 1000);
    return ms;
  };

  static isTokenExpired = (exp) => {
    return exp < Math.floor(Date.now() / 1000);
  };
}
