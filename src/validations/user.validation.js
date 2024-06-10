import Joi from 'joi';
import { JoiUtils } from '@/utils/joi.util';

export const id = {
  params: Joi.object().keys({ id: JoiUtils.id() }),
};

export const updateUserByOwner = {
  body: Joi.object().keys({
    full_name: JoiUtils.fullName(),
    email: JoiUtils.email(),
  }),
};

export const updateUserByAdmin = {
  params: Joi.object().keys({ id: JoiUtils.id() }),
  body: Joi.object().keys({
    full_name: JoiUtils.fullName(),
    email: JoiUtils.email(),
    role_id: JoiUtils.id(),
  }),
};

export const getUsersPagination = {
  query: Joi.object().keys({
    page_size: Joi.number().min(1),
    page: Joi.number().min(1),
    search: Joi.string().trim(),
    sort: JoiUtils.sort(),
  }),
};
