import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRouters } from './app/modules/student/student.route';
const app: Application = express();

// perser
app.use(express.json());
app.use(cors());

// application router
app.use('/api/v1/students', StudentRouters);

app.get('/', (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
});

export default app;
