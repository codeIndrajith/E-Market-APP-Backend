const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // mongoose error handler
  if (err.name === 'castError' && err.kind === 'objectId') {
    statusCode = 404;
    message: 'Resource not found';
  }

  res.status(statusCode).json({
    message,
    statusCode,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
