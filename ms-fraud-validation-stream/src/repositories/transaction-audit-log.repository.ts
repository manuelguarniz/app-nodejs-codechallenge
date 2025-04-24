import { db } from '../configs/db.config';

interface TransactionAuditLog {
  transactionId: string;
  previousStatus: string;
  newStatus: string;
  changedAt: Date;
  reason: string;
  sourceService: string;
}

const saveTransactionAuditLog = async (data: TransactionAuditLog): Promise<void> => {
  const { transactionId, previousStatus, newStatus, changedAt, reason, sourceService } = data;
  await db.transactionAuditLog.create({
    data: {
      transactionId,
      previousStatus,
      newStatus,
      changedAt,
      reason,
      sourceService,
    },
  });
};

export default {
  saveTransactionAuditLog,
};
