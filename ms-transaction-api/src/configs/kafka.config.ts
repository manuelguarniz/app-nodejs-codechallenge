import { Kafka } from 'kafkajs';

export const kafka = new Kafka({
  clientId: 'appid-transaction-api',
  brokers: ['localhost:9092'],
});

export const producer = kafka.producer();
