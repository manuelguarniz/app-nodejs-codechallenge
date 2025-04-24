import transactionRepository from '../repositories/transaction.repository';
import { ITransactionResponse } from '../models/transaction.response';
import { parseDate } from '../utils/helper';

const checkExistTransaction = async (guid: string): Promise<Boolean> => {
  const transaction = await transactionRepository.getTransaction(guid);
  return transaction && transaction.length > 0 && transaction[0].id === guid;
};

const getTransactionDetails = async (guid: string): Promise<ITransactionResponse> => {
  const { id, type, value, createdAt, status } =
    await transactionRepository.getTransactionDetails(guid);
  return {
    transactionExternalId: id,
    transactionType: type,
    transactionStatus: status,
    value: Number(value),
    createdAt: parseDate(createdAt),
  };
};

export default {
  checkExistTransaction,
  getTransactionDetails,
};
