import express from 'express'
import { PORT } from './config/config';
import { userRouter } from './routes';

const app = express();

app.use(express.json());

app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}⚡️`);
});