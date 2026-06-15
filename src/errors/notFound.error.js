import AppError from "./app.error";

export default class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(
      `${resource} not found`,
      404,
      'RESOURCE_NOT_FOUND'
    );
  }
}