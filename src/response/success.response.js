'use strict';

import { statusCodes } from './httpResponse';

class SuccessResponse {
  constructor({ statusCode = statusCodes.OK, metadata = {} }) {
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res, header = {}) {
    return res.status(this.status).json(this.metadata);
  }
}

class OK extends SuccessResponse {
  constructor({ metadata }) {
    super({ metadata });
  }
}

class CREATED extends SuccessResponse {
  constructor({ statusCode = statusCodes.CREATED, metadata }) {
    super({ statusCode, metadata });
  }
}

export { OK, CREATED, SuccessResponse };
