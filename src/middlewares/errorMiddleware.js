const AppError = require('../utils/appError');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error('ERROR 💥', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    const error = Object.create(err);
    // let error = { ...err, message: err.message };

    if (error.name === 'CastError') {
      const message = `Invalid ${error.path}: ${error.value}.`;
      return new AppError(message, 400);
    }

    if (error.code === 11000) {
      const message = `Duplicate field value: '${error.keyValue.name}'. Please use another value!`;
      return new AppError(message, 400);
    }

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((el) => el.message);
      const message = `Invalid input data. ${errors.join('. ')}`;
      return new AppError(message, 400);
    }

    if (error.name === 'JsonWebTokenError') {
      return new AppError('Invalid token. Please log in again!', 401);
    }

    if (error.name === 'TokenExpiredError') {
      return new AppError('Your token has expired! Please log in again.', 401);
    }

    sendErrorProd(error, res);
  }
};

module.exports = globalErrorHandler;

// const handleCastErrorDB = (error) => {
//   const message = `Invalid ${error.path}: ${error.value}.`;
//   return new AppError(message, 400);
// };

// const handleDuplicateFieldsDB = (error) => {
//   // const value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0];
//   const value = error.keyValue.name;

//   const message = `Duplicate field value: '${value}'. Please use another value!`;
//   return new AppError(message, 400);
// };

// const handleValidationErrorDB = (error) => {
//   const errors = Object.values(error.errors).map((el) => el.message);

//   const message = `Invalid input data. ${errors.join('. ')}`;
//   return new AppError(message, 400);
// };

// const handleJWTError = () =>
//   new AppError('Invalid token. Please log in again!', 401);

// const handleJWTExpiredError = () =>
//   new AppError('Your token has expired! Please log in again.', 401);
