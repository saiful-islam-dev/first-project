import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

      // validation check
      //if everything allright next() ->
      // console.log(req.body, 'req.body');
      await schema.parseAsync({
        body: req.body,
      });

      next();
    }
  )
};

export default validateRequest;
