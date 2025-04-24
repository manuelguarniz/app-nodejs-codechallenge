import { consumer } from './configs/kafka.config';
import { log } from './configs/logger.config';
import { PROPS } from './configs/props.config';
import fraudValidationService from './services/fraud-validation.service';
import { transactionSchema } from './zod/transaction.schema';

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: PROPS.KAFKA_TRANSACTION_VALIDATE_TOPIC, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const start = Date.now();
      const json = JSON.parse(message?.value?.toString() || '{}');
      try {
        log.info(`Begin|${topic}`, json);
        const transaction = transactionSchema.parse(json);
        const result = await fraudValidationService.transactionProcess(transaction);
        const end = Date.now();
        log.info(`End|${topic}|${end - start}ms.. `, result);
      } catch (error) {
        const end = Date.now();
        log.error(`End|${topic}|${end - start}ms|Error en parseo del mensaje`, error);
      }
    },
  });
}

run();
