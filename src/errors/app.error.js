import BaseError from "./base.error";

export default class AppError extends BaseError {
  constructor(
    message,
    statusCode = 500,
    code = 'APPLICATION_ERROR',
    details = null
  ) {
    super({
      message,
      statusCode,
      code,
      details,
      isOperational: true,
    });
  }
}