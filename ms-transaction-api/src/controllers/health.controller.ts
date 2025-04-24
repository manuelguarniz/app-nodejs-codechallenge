import { NextFunction, Request, Response } from 'express';
import { sendSuccessResponse } from '../utils/response-handler';

export const getHealth = async (req: Request, res: Response, next: NextFunction) => {
  sendSuccessResponse(res, 'OK');
  next();
};
