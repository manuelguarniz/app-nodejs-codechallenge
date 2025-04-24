import { db } from '../configs/db.config';

const getTransaction = async (guid: string) => {
  return await db.transaction.findMany({ where: { id: guid } });
};

const getTransactionDetails = async (guid: string) => {
  return await db.transaction.findFirstOrThrow({
    select: {
      id: true,
      value: true,
      createdAt: true,
      type: {
        select: {
          name: true,
        },
      },
      status: {
        select: {
          name: true,
        },
      },
    },
    where: { id: guid },
  });
};

export default {
  getTransaction,
  getTransactionDetails,
};
