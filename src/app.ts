import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Blog Management Backend Software Application!');
});

export default app;
