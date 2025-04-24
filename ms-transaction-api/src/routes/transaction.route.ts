import { Router } from 'express';
import { checkExistTransaction, getTransactionDetail } from '../controllers/transaction.controller';

const router = Router();

router.get('/:id/status', checkExistTransaction, getTransactionDetail);

export default router;
