import dotenv from 'dotenv';

dotenv.config();

const FIXER_API_KEY = process.env.FIXER_API_KEY || '';
const FIXER_URL = process.env.FIXER_URL || 'http://data.fixer.io/api/latest';

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 9000;
const API_KEY = process.env.API_KEY || '';
const DEFAULT_FEE = process.env.DEFAULT_FEE ? Number(process.env.DEFAULT_FEE) : 0.01;

const config = {
  server: {
    port: SERVER_PORT,
    apiKey: API_KEY,
  },
  app: {
    defaultFee: DEFAULT_FEE,
  },
  api: {
    fixer: {
      key: FIXER_API_KEY,
      url: FIXER_URL,
    },
  },
};

export default config;
