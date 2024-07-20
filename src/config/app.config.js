'use strict';
import { env } from '@/utils/function';

const development = {
  app: {
    port: env('DEV_APP_PORT', 8080),
    prefix: env('DEV_ROUTER_PREFIX', '/api/v1'),
  },
  jwt: {
    secret: env('JWT_SECRET', 'gdscdut'),
    accessExpiration: env('JWT_ACCESS_EXPIRATION', '1d'),
    refreshExpiration: env('JWT_REFRESH_EXPIRATION', '30d'),
  },
  db: {
    host: env('HOST', 'localhost'),
    port: env('PORT', 5432),
    database: env('DB_NAME', 'postgres'),
    username: env('DB_USER', 'postgres'),
    password: env('DB_PASS', 'postgres'),
    dialect: env('DB_DIALECT', 'postgres'),
  },
  payment: {
    vnp_TmnCode: env('vnp_TmnCode'),
    vnp_HashSecret: env('vnp_HashSecret'),
    vnp_Url: env('vnp_Url'),
    vnp_Api: env('vnp_Api'),
    vnp_ReturnUrl: env('vnp_ReturnUrl'),
  },
};
const production = {
  app: {
    port: env('DEV_APP_PORT', 8080),
    prefix: env('DEV_ROUTER_PREFIX', '/api/v1'),
  },
  jwt: {
    secret: env('JWT_SECRET', 'gdscdut'),
    accessExpiration: env('JWT_ACCESS_EXPIRATION', '1d'),
    refreshExpiration: env('JWT_REFRESH_EXPIRATION', '30d'),
  },
  db: {
    host: env('HOST', 'localhost'),
    port: env('PORT', 5432),
    database: env('DB_NAME', 'postgres'),
    username: env('DB_USER', 'postgres'),
    password: env('DB_PASS', 'postgres'),
    dialect: env('DB_DIALECT', 'postgres'),
  },
  payment: {
    vnp_TmnCode: env('vnp_TmnCode'),
    vnp_HashSecret: env('vnp_HashSecret'),
    vnp_Url: env('vnp_Url'),
    vnp_Api: env('vnp_Api'),
    vnp_ReturnUrl: env('vnp_ReturnUrl'),
  },
};

const config = { development, production };
const node = env('NODE_ENV', 'development');
export default config[node];
