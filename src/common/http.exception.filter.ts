import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter
  implements ExceptionFilter
{
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  catch(
    exception: Error,
    host: ArgumentsHost,
  ): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const httpMessage = exception.name;

    const responseBody = {
      statusCode: httpStatus,
      message: httpMessage,
    };

    httpAdapter.reply(
      ctx.getResponse(),
      responseBody,
      httpStatus,
    );
  }
}
