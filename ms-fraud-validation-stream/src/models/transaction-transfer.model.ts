import { z } from 'zod';
import { transactionSchema } from '../zod/transaction.schema';

export type TransactionTransferModel = z.infer<typeof transactionSchema>;
