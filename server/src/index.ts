import express from 'express';
import cors from 'cors';
import { errorHandler } from '@/utils/middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res, _next) => {
  res.status(200).json({ status: 'OK' });
});

app.use(errorHandler);

export default app;
