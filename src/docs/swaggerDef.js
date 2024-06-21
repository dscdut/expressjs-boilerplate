import { version, name } from '../../package.json';
import config from '@/config/app.config';

const url = `http://localhost:${config.app.port}${config.app.prefix}`;
const swaggerDef = {
  openapi: '3.1.0',
  info: {
    title: `${name} API documentation`,
    version,
    license: {
      name: 'MIT License',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  servers: [
    {
      url,
    },
  ],
};

console.log('swagger api doc: ', url + '/docs');

export default swaggerDef;
