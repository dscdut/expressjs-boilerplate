import Joi from 'joi';
import { JoiUtils } from '@/utils/joi.util';

export const register = {
  body: Joi.object().keys({
    full_name: JoiUtils.fullName(),
    email: JoiUtils.email(),
    password: JoiUtils.password(),
    confirm_password: JoiUtils.confirmPassword(),
  }),
};

export const login = {
  body: Joi.object().keys({
    email: JoiUtils.email(),
    password: Joi.string().required(),
  }),
};
