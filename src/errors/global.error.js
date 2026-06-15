import BaseError from "./base.error";

export const globalErrorHandler = (
  error,
  req,
  res,
  next
) => {
  if (!(error instanceof BaseError)) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      code: 'INTERNAL_SERVER_ERROR',
    });
  }

  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
    code: error.code,
    details: error.details,
  });
};