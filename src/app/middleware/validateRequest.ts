import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validationRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validation Check
      // if everything allright next() ->
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validationRequest;
