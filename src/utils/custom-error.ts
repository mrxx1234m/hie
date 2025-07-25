import { HttpException } from '@nestjs/common';

export default  class CustomError extends HttpException {
  constructor(status: number, message: string) {
    super(message, status);
  }
}
