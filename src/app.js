//core

//third-party
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

//module
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import hotelsRoutes from './routes/hotels.js';

dotenv.config();

const app = express();

// middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/hotels', hotelsRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
