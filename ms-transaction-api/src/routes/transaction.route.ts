import { Router } from 'express';
import {
  checkExistTransaction,
  getTransactionDetail,
  tranferFunds,
  validateTransferData,
} from '../controllers/transaction.controller';

const router = Router();

router.get('/:id', checkExistTransaction, getTransactionDetail);
router.post('/', validateTransferData, tranferFunds);

export default router;
