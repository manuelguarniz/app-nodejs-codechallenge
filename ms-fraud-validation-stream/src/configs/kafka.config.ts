import { Kafka } from 'kafkajs';
import { PROPS } from './props.config';

export const kafka = new Kafka({
  clientId: PROPS.KAFKA_APPLICATION_ID,
  brokers: PROPS.KAFKA_BROKERS.split(','),
});

export const consumer = kafka.consumer({ groupId: PROPS.KAFKA_APPLICATION_GROUP });
