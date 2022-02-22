import 'dotenv/config';

const SES_API_VERSION = process.env.SES_API_VERSION || '2010-12-01';
const SES_REGION = process.env.SES_REGION || 'us-east-1';
const SES_AWS_ACCESS_KEY_ID = process.env.SES_AWS_ACCESS_KEY_ID || '';
const SES_AWS_SECRET_ACCESS_KEY = process.env.SES_AWS_SECRET_ACCESS_KEY || '';

const SNS_API_VERSION = process.env.SES_API_VERSION || '2010-12-01';

export {
  SES_API_VERSION, SES_REGION, SES_AWS_ACCESS_KEY_ID, SES_AWS_SECRET_ACCESS_KEY,
  SNS_API_VERSION
};
