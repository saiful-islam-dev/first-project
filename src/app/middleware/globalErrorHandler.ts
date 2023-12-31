/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction,
) => {
  const statusCode = 500;
  const message = err.message || 'Someting is worng';

  return res.status(statusCode).json({
    susscess: false,
    message: message,
    error: err,
  });
};

export default globalErrorHandler;
