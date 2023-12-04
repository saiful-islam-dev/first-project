import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFoud';
import router from './app/router';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

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
