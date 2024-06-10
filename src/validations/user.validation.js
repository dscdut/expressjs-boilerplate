import Joi from 'joi';
import { JoiUtils } from '@/utils/joi.util';

export const id = {
  params: Joi.object().keys({ id: JoiUtils.positiveNumber() }),
};

export const updateUserByOwner = {
  body: Joi.object().keys({
    full_name: JoiUtils.fullName(),
    email: JoiUtils.email(),
  }),
};

export const updateUserByAdmin = {
  params: Joi.object().keys({ id: JoiUtils.positiveNumber() }),
  body: Joi.object().keys({
    full_name: JoiUtils.fullName(),
    email: JoiUtils.email(),
    role_id: JoiUtils.positiveNumber(),
  }),
};

export const getUsers = {
  query: Joi.object().keys({
    page_size: Joi.number().min(1),
    page: Joi.number().min(1),
  }),
};
