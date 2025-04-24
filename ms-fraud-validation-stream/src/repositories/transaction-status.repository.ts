import { db } from '../configs/db.config';

const getTransactionStatus = async () => {
  return await db.transactionStatus.findMany();
};

export default {
  getTransactionStatus,
};
