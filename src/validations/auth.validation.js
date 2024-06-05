import Joi from 'joi';
import { password } from './custom.validation';
import { ErrorResponse } from '@/response/error.response';
import { errorCode } from '@/response/httpResponse';
import statusCode from '@/response/httpResponse/statusCode';

export const register = {
  body: Joi.object()
    .keys({
      full_name: Joi.string().required().min(1).max(150),
      email: Joi.string().required().min(6).max(50),
      password: Joi.string().required().custom(password),
      confirm_password: Joi.string().required().custom(password),
      role: Joi.number().required(),
    })
    .error(() => {
      const err_code = 104;
      return new ErrorResponse(errorCode[err_code], statusCode.BAD_REQUEST, err_code);
    }),
};

export const login = {
  body: Joi.object()
    .keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    })
    .error(() => {
      const err_code = 101;
      return new ErrorResponse(errorCode[err_code], statusCode.BAD_REQUEST, err_code);
    }),
};
