import transactionRepository from '../repositories/transaction.repository';
import { ITransactionResponse } from '../models/response/transaction.response';
import { parseDate } from '../utils/helper';
import { ICreateTransactionRequest } from '../models/request/create-transation.request';
import { ICreateTransactionResponse } from '../models/response/create-transation.response';

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

const tranferFunds = async (
  data: ICreateTransactionRequest,
): Promise<ICreateTransactionResponse> => {
  const transaction = await transactionRepository.createTransaction({ ...data });
  return {
    operationTransactionId: transaction.id,
  } as ICreateTransactionResponse;
};

export default {
  tranferFunds,
  checkExistTransaction,
  getTransactionDetails,
};
