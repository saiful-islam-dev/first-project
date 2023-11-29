import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  susscess: boolean;
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    susscess: data.susscess,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
