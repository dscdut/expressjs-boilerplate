'use strict';

import { statusCodes } from './httpResponse';

class SuccessResponse {
  constructor({ statusCode = statusCodes.OK, data = {} }) {
    this.status = statusCode;
    this.data = data;
  }

  send(res, header = {}) {
    return res.status(this.status).json(this.data);
  }
}

class OK extends SuccessResponse {
  constructor({ data }) {
    super({ data });
  }
}

class CREATED extends SuccessResponse {
  constructor({ statusCode = statusCodes.CREATED, data }) {
    super({ statusCode, data });
  }
}

export { OK, CREATED, SuccessResponse };
