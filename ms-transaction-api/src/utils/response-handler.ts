import { Response } from 'express';
import HttpStatusCode from './HttpStatusCode';

interface SuccessResponse<T> {
  success: true;
  data: T;
}

interface ErrorResponse<T> {
  success: false;
  error: {
    message: T;
  };
}

export const sendSuccessResponse = <T>(
  res: Response,
  data: T,
  status = HttpStatusCode.OK,
): Response<SuccessResponse<T>> => {
  return res.status(status).json({
    success: true,
    data,
  });
};

export const sendValidationError = <T>(
  res: Response,
  message: T,
  errors: string[],
  status = HttpStatusCode.BAD_REQUEST,
): Response<ErrorResponse<T>> => {
  return res.status(status).json({
    success: false,
    error: {
      message: message,
      errors: errors,
    },
  });
};

export const sendDuplicateError = <T>(
  res: Response,
  message: T,
  status = HttpStatusCode.BAD_REQUEST,
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};

export const sendNotFoundResponse = <T>(
  res: Response,
  message: T,
  status = HttpStatusCode.NOT_FOUND,
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};

export const sendErrorResponse = <T>(
  res: Response,
  message: T,
  status = HttpStatusCode.INTERNAL_SERVER_ERROR,
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};
