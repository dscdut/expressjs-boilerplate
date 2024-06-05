import 'dotenv/config';
const env = (envKey, defaultVal = null) => process.env[envKey] || defaultVal;

module.exports = {
  env,
};
