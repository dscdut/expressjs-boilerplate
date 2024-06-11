'use strict';
import 'dotenv/config';
import express from 'express';
import router from '@/config/routes.config';
import appConfig from '@/config/app.config';
import cookieparser from 'cookie-parser';
import models from '@/database/models';
import instancePostgresdb from '@/config/database.config';
import helmet from 'helmet';
import configCors from '@/config/cors.config';

// sync database
models.sequelize.sync();

const {
  app: { port },
} = appConfig;
const app = express();

// set security HTTP headers
app.use(helmet());

// config cors
configCors(app);

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser('MY SECRET'));

app.use(router);

app.listen(port, () => {
  console.log('------------ new request -----------------');
  console.log(`server is running at: http://localhost:${port}`);
});
