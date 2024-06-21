'use strict';
import { BAD_REQUEST, FORBIDDEN, NOT_FOUND, UNAUTHORIZED } from 'http-status';

class ErrorResponse extends Error {
  constructor(message, status, err_code, details) {
    super(message);
    this.status = status;
    this.err_code = err_code;
    this.details = details;
  }
}

class BadRequestError extends ErrorResponse {
  constructor(message, status = BAD_REQUEST, err_code, details) {
    super(message, status, err_code, details);
  }
}

class Unauthorized extends ErrorResponse {
  constructor(message, status = UNAUTHORIZED, err_code, details) {
    super(message, status, err_code, details);
  }
}

class Forbidden extends ErrorResponse {
  constructor(message, status = FORBIDDEN, err_code, details) {
    super(message, status, err_code, details);
  }
}

class NotFoundError extends ErrorResponse {
  constructor(message, status = NOT_FOUND, err_code, details) {
    super(message, status, err_code, details);
  }
}

export { ErrorResponse, BadRequestError, Unauthorized, Forbidden, NotFoundError };
