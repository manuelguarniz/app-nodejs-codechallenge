import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { sendErrorResponse, sendValidationError } from '../utils/response-handler';
import { logger } from '../app';
import { PROPS } from '../configs/props.config';

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    const errors = error.errors.map((e: any) => e.message) as string[];
    sendValidationError(res, `Invalid Fields`, errors);
    return;
  }

  const messageErr =
    PROPS.NODE_ENV == 'developement'
      ? { message: error.message }
      : { message: 'Internal Server Error' };
  logger.error(error.message);
  sendErrorResponse(res, messageErr);
  return;
};
