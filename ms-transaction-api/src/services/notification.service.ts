import { Transaction } from '@prisma/client';
import { producer } from '../configs/kafka.config';

const notifyTransaction = async (data: any): Promise<void> => {
  await producer.connect();
  await producer.send({
    topic: 'queue-transaction-validate-stream',
    messages: [{ value: JSON.stringify(data) }],
  });
};

export default {
  notifyTransaction,
};
