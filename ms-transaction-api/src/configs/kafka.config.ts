import { Kafka, Partitioners } from 'kafkajs';
import { PROPS } from './props.config';

export const kafka = new Kafka({
  clientId: PROPS.KAFKA_APPLICATION_ID,
  brokers: PROPS.KAFKA_BROKERS.split(','),
});

export const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});
