import Joi from 'joi';
import { JoiUtils } from '@/utils/joi.util';

export const id = {
  params: Joi.object().keys({ id: JoiUtils.id() }),
};
