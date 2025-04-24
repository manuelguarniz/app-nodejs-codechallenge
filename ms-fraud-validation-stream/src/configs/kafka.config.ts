import { Kafka } from 'kafkajs';

export const kafka = new Kafka({
  clientId: 'appid-transaction-api',
  brokers: ['localhost:9092'],
});

export const consumer = kafka.consumer({ groupId: 'group-transaction-api' });
