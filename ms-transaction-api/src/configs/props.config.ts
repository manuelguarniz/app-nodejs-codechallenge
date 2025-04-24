import dotenv from 'dotenv';

dotenv.config();

// @ts-ignore
export const PROPS: {
  PORT?: number;
  NODE_ENV?: string;
} = { ...process.env };
