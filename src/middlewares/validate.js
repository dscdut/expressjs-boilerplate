import Joi from 'joi';
import pick from '@/utils/pick';
import { ErrorResponse } from '@/response/error.response';
import { errorCodes, errorMessages } from '@/response/httpResponse';
import { BAD_REQUEST } from 'http-status';

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    const details = error.details.map((detail) => detail.message);
    return next(new ErrorResponse(errorMessages.INVALID_SYNTAX, BAD_REQUEST, errorCodes.INVALID_SYNTAX, details));
  }
  Object.assign(req, value);
  return next();
};

export default validate;
