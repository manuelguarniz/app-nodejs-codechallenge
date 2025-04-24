import transactionStatusRepository from '../repositories/transaction-status.repository';

interface TransactionStatus {
  [key: string]: string;
}
const getTransactionStatus = async (): Promise<TransactionStatus> => {
  const statuses = await transactionStatusRepository.getTransactionStatus();
  return statuses.reduce((acc, item) => {
    acc[item.id] = item.name;
    return acc;
  }, {} as TransactionStatus);
};

export default {
  getTransactionStatus,
};
