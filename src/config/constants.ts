import dotenv from 'dotenv';
dotenv.config();

const dotenvCheck = (property: string | undefined): string => {
  if (!property) {
    throw 'dotenv check failed.'
  }

  return property;
}

const PORT = dotenvCheck(process.env.PORT);
const API_BASE = dotenvCheck(process.env.API_BASE);
const DB_SECRET = dotenvCheck(process.env.DB_SECRET);
const DB_NAME = dotenvCheck(process.env.DB_NAME);


const ACCEPTED_AGENTS = ['KBLWebv1'];

export { PORT, API_BASE, ACCEPTED_AGENTS, DB_SECRET, DB_NAME };
