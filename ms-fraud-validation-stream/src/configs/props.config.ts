import dotenv from 'dotenv';

dotenv.config();

// @ts-ignore
export const PROPS: {
  NODE_ENV?: string;
  KAFKA_APPLICATION_ID: string;
  KAFKA_APPLICATION_GROUP: string;
  KAFKA_TRANSACTION_VALIDATE_TOPIC: string;
  KAFKA_BROKERS: string;
} = { ...process.env };
