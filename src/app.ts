/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

//parsers
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'] }));

// application routes
app.use('/api/v1', router);

const text = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', text);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
