import { TransationStatus } from '../models/transaction-status.enum';
import { TransactionTransferModel } from '../models/transaction-transfer.model';
import transactionAuditLogRepository from '../repositories/transaction-audit-log.repository';
import transactionRepository from '../repositories/transaction.repository';
import { parseDate } from '../utils/helper';
import transactionStatusService from './transaction-status.service';

const transactionProcess = async (data: TransactionTransferModel) => {
  if (data) {
    const { createdAt, id, statusId, value } = data;
    const statuses = await transactionStatusService.getTransactionStatus();
    const currentStatus = statuses[statusId];
    await transactionAuditLogRepository.saveTransactionAuditLog({
      transactionId: id,
      previousStatus: currentStatus,
      newStatus: '',
      reason: 'Transaction created',
      changedAt: parseDate(createdAt),
      sourceService: 'ms-fraud-validation-stream',
    });

    const amount = Number(value);
    const setStatus =
      amount && !isNaN(amount) && amount > 1 && amount < 1000
        ? TransationStatus.APPROVED
        : TransationStatus.REJECTED;
    const newStatus = statuses[setStatus];
    const result = await transactionRepository.updateTransactionStatus(id, setStatus);
    await transactionAuditLogRepository.saveTransactionAuditLog({
      transactionId: id,
      previousStatus: currentStatus,
      newStatus: newStatus,
      reason: 'Update transaction status',
      changedAt: parseDate(createdAt),
      sourceService: 'ms-fraud-validation-stream',
    });

    return result;
  }
};

export default {
  transactionProcess,
};
