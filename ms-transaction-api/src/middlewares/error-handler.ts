import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { sendErrorResponse, sendValidationError } from '../utils/response-handler';

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    const errors = error.errors.map((e: any) => e.message) as string[];
    sendValidationError(res, `Datos inválidos`, errors);
    return;
  }

  const messageErr =
    process.env.APP_ENV == 'developement'
      ? { message: error.message }
      : { message: 'Internal Server Error' };
  sendErrorResponse(res, messageErr);
  return;
};
