export class HttpError extends Error {
  statusCode = 500;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}