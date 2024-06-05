'use strict';
import express from 'express';
import routes from '@/routes';
import appConfig from '@/config/app.config';

const {
  app: { prefix },
} = appConfig;
const router = express.Router();

router.use(prefix, routes);

// handler error
router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
router.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    err_code: error.err_code || 103,
    // stack: error.stack,
    message: error.message || 'An unexpected error occurred on the server',
  });
});

export default router;
