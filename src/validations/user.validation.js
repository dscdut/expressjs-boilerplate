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
