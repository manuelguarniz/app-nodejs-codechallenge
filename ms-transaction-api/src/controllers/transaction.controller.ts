import { NextFunction, Request, Response } from 'express';
import transactionService from '../services/transaction.service';
import { sendNotFoundResponse, sendSuccessResponse } from '../utils/response-handler';

export const checkExistTransaction = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.query.id || req.params.id || req.body.id;
  try {
    const existTransaction = await transactionService.checkExistTransaction(id);
    if (!existTransaction) {
      sendNotFoundResponse(res, `Transaction not found`);
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const getTransactionDetail = async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id as string;
  try {
    const transactionDetail = await transactionService.getTransactionDetails(id);
    sendSuccessResponse(res, transactionDetail);
    next();
  } catch (error) {
    next(error);
  }
};
