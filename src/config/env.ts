import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ─── Fix __dirname for ES Modules ─────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Point dotenv to root .env file ──────────────────────────────────────────
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
//                                              ^^^^^^^^^^
//                                              going up from src/config/ to root

const requiredEnvVars = [
  'PORT',
  'NODE_ENV',
  'DB_URI',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
  'WEBSITE_URL',
  'MAIL_HOST',
  'MAIL_PORT',
  'MAIL_USER',
  'MAIL_PASS',
  'MAIL_FROM'
];

const missingVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingVars.length > 0) {
  console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
  process.exit(1);
}

const env = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URI: process.env.DB_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  WEBSITE_URL: process.env.WEBSITE_URL as string,
  MAIL_HOST: process.env.MAIL_HOST as string,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_USER: process.env.MAIL_USER as string,
  MAIL_PASS: process.env.MAIL_PASS as string,
  MAIL_FROM: process.env.MAIL_FROM as string,
};

export default env;