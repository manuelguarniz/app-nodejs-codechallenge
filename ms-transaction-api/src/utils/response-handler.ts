import { Response } from 'express';
import HttpStatusCode from './http-status-code';

export const sendSuccessResponse = <T>(
  res: Response,
  data: T,
  status = HttpStatusCode.OK,
): Response<T> => {
  return res.status(status).json(data);
};

export const sendValidationError = <T>(
  res: Response,
  message: T,
  errors: string[],
  status = HttpStatusCode.BAD_REQUEST,
): Response<T> => {
  return res.status(status).json({
    message: message,
    errors: errors,
  });
};

export const sendDuplicateError = <T>(
  res: Response,
  message: T,
  status = HttpStatusCode.BAD_REQUEST,
): Response<T> => {
  return res.status(status).json({ message });
};

export const sendNotFoundResponse = <T>(
  res: Response,
  message: T,
  status = HttpStatusCode.NOT_FOUND,
): Response<T> => {
  return res.status(status).json({ message });
};

export const sendErrorResponse = <T>(
  res: Response,
  message: T,
  status = HttpStatusCode.INTERNAL_SERVER_ERROR,
): Response<T> => {
  return res.status(status).json({ message });
};
