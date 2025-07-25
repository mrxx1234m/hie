import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import CustomError from './custom-error'; // bu default export bo'lishi kerak

@Catch(CustomError)
export class CustomErrorFilter implements ExceptionFilter {
  catch(exception: CustomError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
