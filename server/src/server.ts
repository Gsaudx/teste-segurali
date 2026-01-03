import 'dotenv/config';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { ZodError } from 'zod';
import { userRoutes } from './routes/user.routes';
import { AppError } from './errors/AppError';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      issues: err.format(),
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err);
  return res.status(500).json({ message: 'Internal server error' });
});

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
