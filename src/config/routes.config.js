'use strict';
import express from 'express';
import routes from '@/routes';
import appConfig from '@/config/app.config';
import { errorPharses, errorCodes, statusCodes } from '@/response/httpResponse';

const {
  app: { prefix },
} = appConfig;
const router = express.Router();

router.use(prefix, routes);

// handler error
router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = statusCodes.NOT_FOUND;
  next(error);
});

router.use((error, req, res, next) => {
  const statusCode = error.status || statusCodes.INTERNAL_SERVER_ERROR;
  const response = {
    err_code: error.err_code || errorCodes.INTERNAL_SERVER_ERROR,
    // stack: error.stack,
    message: error.message || errorPharses.INTERNAL_SERVER_ERROR,
  };

  if (error.details) {
    response.details = error.details;
  }
  return res.status(statusCode).json(response);
});

export default router;
