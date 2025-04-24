import { ITransactionStatusResponse } from './transaction-status.response';
import { ITransactionTypeResponse } from './transaction-type.response';

export interface ITransactionResponse {
  transactionExternalId: string;
  transactionType: ITransactionTypeResponse;
  transactionStatus: ITransactionStatusResponse;
  value: number;
  createdAt: string;
}
