import Joi from 'joi';
import httpStatus from 'http-status';
import pick from '@/utils/pick';
import { ErrorResponse } from '@/response/error.response';

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    return next(new ErrorResponse(error.message, error.status, error.err_code));
  }
  Object.assign(req, value);
  return next();
};

export default validate;
