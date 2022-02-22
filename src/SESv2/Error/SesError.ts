export default class SesError extends Error {

  constructor(readonly message: string, readonly code: string, readonly statusCode: number) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
  }
}