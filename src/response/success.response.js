'use strict';
import { OK, CREATED } from 'http-status';

class SuccessResponse {
  constructor({ statusCode = OK, data = {} }) {
    this.status = statusCode;
    this.data = data;
  }

  send(res, header = {}) {
    return res.status(this.status).json(this.data);
  }
}

class OkResponse extends SuccessResponse {
  constructor({ data }) {
    super({ data });
  }
}

class CreatedResponse extends SuccessResponse {
  constructor({ statusCode = CREATED, data }) {
    super({ statusCode, data });
  }
}

export { OkResponse, CreatedResponse, SuccessResponse };
