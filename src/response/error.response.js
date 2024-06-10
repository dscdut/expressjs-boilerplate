'use strict';
import { statusCodes, responsePharses } from '@/response/httpResponse';

class ErrorResponse extends Error {
  constructor(message, status, err_code, details) {
    super(message);
    this.status = status;
    this.err_code = err_code;
    this.details = details;
  }
}

class BadRequestError extends ErrorResponse {
  constructor(message = responsePharses.BAD_REQUEST, status = statusCodes.BAD_REQUEST, err_code, details) {
    super(message, status, err_code, details);
  }
}

class Unauthorized extends ErrorResponse {
  constructor(message = responsePharses.UNAUTHORIZED, status = statusCodes.UNAUTHORIZED, err_code, details) {
    super(message, status, err_code, details);
  }
}

class Forbidden extends ErrorResponse {
  constructor(message = responsePharses.FORBIDDEN, status = statusCodes.FORBIDDEN, err_code, details) {
    super(message, status, err_code, details);
  }
}

class NotFoundError extends ErrorResponse {
  constructor(message = responsePharses.NOT_FOUND, status = statusCodes.NOT_FOUND, err_code, details) {
    super(message, status, err_code, details);
  }
}

export { ErrorResponse, BadRequestError, Unauthorized, Forbidden, NotFoundError };
