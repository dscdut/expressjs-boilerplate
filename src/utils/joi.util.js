import Joi from 'joi';
import validationMessages from './validation-messages';

const EMAIL_FORMAT = /^.*@.*\.(com|net|org)$/;
const PWD_FORMAT = /^.*(?=.{7,50})(?=.*\d)(?=.*[A-Z]).*$/;
const FULL_NAME_FORMAT = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
// example: full_name:ASC,createdAt:DESC,updatedAt:DESC
const SORT_FORMAT = /^(\w+:(ASC|DESC),)*(\w+:(ASC|DESC))$/;
const PHONE_NUMBER_FORMAT = /^\+?[0-9]{10,15}$/;

export class JoiUtils {
  static fullName = () => {
    return Joi.string().pattern(FULL_NAME_FORMAT).required().messages({
      'string.pattern.base': validationMessages.FULL_NAME,
    });
  };

  static email = () => {
    return Joi.string().required().pattern(EMAIL_FORMAT).messages({
      'string.pattern.base': validationMessages.EMAIL,
    });
  };

  static password = () => {
    return Joi.string().required().pattern(PWD_FORMAT).messages({
      'string.pattern.base': validationMessages.PASSWORD,
    });
  };

  static confirmPassword = () => {
    return Joi.string().required().valid(Joi.ref('password')).messages({
      'any.only': validationMessages.CONFIRM_PASSWORD,
    });
  };

  static integerId = () => {
    return Joi.number().required().integer().positive().messages({
      'number.base': validationMessages.ID,
    });
  };

  static sort = () => {
    return Joi.string().optional().pattern(SORT_FORMAT).messages({
      'string.pattern.base': validationMessages.SORT,
    });
  };

  static phoneNumber = () => {
    return Joi.string().required().pattern(PHONE_NUMBER_FORMAT).messages({
      'string.pattern.base': validationMessages.PHONE_NUMBER,
    });
  };

  static price = () => {
    return Joi.number().positive().required();
  };

  static uuid = () => {
    return Joi.string().uuid({ version: 'uuidv4' }).required();
  }
}
