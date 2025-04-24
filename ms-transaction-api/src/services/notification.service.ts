import { producer } from '../configs/kafka.config';
import { PROPS } from '../configs/props.config';

const notifyTransaction = async (data: any): Promise<void> => {
  await producer.connect();
  await producer.send({
    topic: PROPS.KAFKA_TRANSACTION_VALIDATE_TOPIC,
    messages: [{ value: JSON.stringify(data) }],
  });
};

export default {
  notifyTransaction,
};
