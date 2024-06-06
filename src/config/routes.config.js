'use strict';
import express from 'express';
import routes from '@/routes';
import appConfig from '@/config/app.config';
import { errorMessages, errorCodes, statusCodes } from '@/response/httpResponse';
import { ErrorResponse } from '@/response/error.response';

const {
  app: { prefix },
} = appConfig;
const router = express.Router();

router.use(prefix, routes);

// handler error
router.use((req, res, next) => {
  const details = [errorMessages.ROUTE_NOT_FOUND];
  const error = new ErrorResponse(
    errorMessages.RESOURCE_NOT_EXIST,
    statusCodes.NOT_FOUND,
    errorCodes.RESOURCE_NOT_EXIST,
    details,
  );
  next(error);
});

router.use((error, req, res, next) => {
  const statusCode = error.status || statusCodes.INTERNAL_SERVER_ERROR;
  const response = {
    err_code: error.err_code || errorCodes.INTERNAL_SERVER_ERROR,
    // stack: error.stack,
    message: error.message || errorMessages.INTERNAL_SERVER_ERROR,
  };

  if (error.details) {
    response.details = error.details;
  }
  return res.status(statusCode).json(response);
});

export default router;
