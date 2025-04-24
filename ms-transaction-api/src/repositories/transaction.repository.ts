import { db } from '../configs/db.config';

enum TransationStatus {
  PENDING = 1,
  APPROVED = 2,
  REJECTED = 3,
}

interface TransactionModel {
  accountExternalIdDebit: string;
  accountExternalIdCredit: string;
  tranferTypeId: number;
  value: number;
}

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

const createTransaction = async (data: TransactionModel) => {
  const { accountExternalIdCredit, accountExternalIdDebit, tranferTypeId, value } = data;
  return await db.transaction.create({
    data: {
      accountExternalIdCredit,
      accountExternalIdDebit,
      typeId: tranferTypeId,
      statusId: TransationStatus.PENDING,
      value,
    },
  });
};

export default {
  createTransaction,
  getTransaction,
  getTransactionDetails,
};
