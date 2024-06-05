'use strict';
import { env } from '@/utils/function.js';

const development = {
  app: {
    port: env('DEV_APP_PORT', 8080),
    prefix: env('DEV_ROUTER_PREFIX', '/api/v1'),
  },
  jwt: {
    secret: env('JWT_SECRET', 'gdscdut'),
    accessExpirationMinutes: env('JWT_ACCESS_EXPIRATION_MINUTES', 30),
    refreshExpirationDays: env('JWT_REFRESH_EXPIRATION_DAYS', 30),
  },
  db: {
    host: env('HOST', 'localhost'),
    port: env('PORT', 5432),
    database: env('DB_NAME', 'postgres'),
    username: env('DB_USER', 'localhost'),
    password: env('DB_PASS', '123456'),
    dialect: env('DB_DIALECT', 'postgres'),
  },
};
const production = {
  app: {
    port: env('DEV_APP_PORT', 8080),
    prefix: env('DEV_ROUTER_PREFIX', '/api/v1'),
  },
  jwt: {
    secret: env('JWT_SECRET', 'gdscdut'),
    accessExpirationMinutes: env('JWT_ACCESS_EXPIRATION_MINUTES', 30),
    refreshExpirationDays: env('JWT_REFRESH_EXPIRATION_DAYS', 30),
  },
  db: {
    host: env('HOST', 'localhost'),
    port: env('PORT', 5432),
    database: env('DB_NAME', 'postgres'),
    username: env('DB_USER', 'localhost'),
    password: env('DB_PASS', '123456'),
    dialect: env('DB_DIALECT', 'postgres'),
  },
};

const config = { development, production };
const node = env('NODE_ENV', 'development');
export default config[node];
