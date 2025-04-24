import { db } from '../configs/db.config';

const updateTransactionStatus = async (id: string, newStatus: number) => {
  return await db.transaction.update({
    where: {
      id,
    },
    data: {
      statusId: newStatus,
    },
  });
};

export default {
  updateTransactionStatus,
};
