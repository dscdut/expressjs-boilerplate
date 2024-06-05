'use strict';
import { statusCodes, responsePharses } from '@/response/httpResponse';

class ErrorResponse extends Error {
  constructor(message, status, err_code) {
    super(message);
    this.status = status;
    this.err_code = err_code;
  }
}

class BadRequestError extends ErrorResponse {
  constructor(message = responsePharses.BAD_REQUEST, status = statusCodes.BAD_REQUEST, err_code) {
    super(message, status, err_code);
  }
}

class Unauthorized extends ErrorResponse {
  constructor(message = responsePharses.UNAUTHORIZED, status = statusCodes.UNAUTHORIZED, err_code) {
    super(message, status, err_code);
  }
}

class Forbidden extends ErrorResponse {
  constructor(message = responsePharses.FORBIDDEN, status = statusCodes.FORBIDDEN, err_code) {
    super(message, status, err_code);
  }
}

class NotFoundError extends ErrorResponse {
  constructor(message = responsePharses.NOT_FOUND, status = statusCodes.NOT_FOUND, err_code) {
    super(message, status, err_code);
  }
}

export { ErrorResponse, BadRequestError, Unauthorized, Forbidden, NotFoundError };
