import jwt from 'jsonwebtoken';
import config from '@/config/app.config.js';

export class jwtService {
  static generateToken = (data, expiresMs, secret = config.jwt.secret) => {
    const token = jwt.sign({ exp: Math.floor(expiresMs / 1000), ...data }, secret);
    return token;
  };

  static verifyToken = (token) => {
    const payload = jwt.verify(token, config.jwt.secret);
    return payload;
  };

  static generateExpires = (hours) => {
    const ms = Math.floor(Date.now() + hours * 60 * 60 * 1000);
    return ms;
  };
}
