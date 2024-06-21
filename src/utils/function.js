import 'dotenv/config';
const env = (envKey, defaultVal = null) => process.env[envKey] || defaultVal;

export { env };
