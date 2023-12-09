/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';
import handleZodError from '../interface/handleZodError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';

  let errorSourcess: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSourcess = simplifiedError?.errorSourcess;
  } else if (err?.name === 'ValidationError') {
  
  
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSourcess,
    err,
    stack: config.NODE_ENV === 'deveopment' ? err?.stack : null,
  });
};

export default globalErrorHandler;

/* 
success: 
message:
errorSourcess: [
  path: '',
  message: "",
]
stack:

*/
