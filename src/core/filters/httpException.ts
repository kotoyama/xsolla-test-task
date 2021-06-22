import {
  Catch,
  Logger,
  HttpStatus,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const req = ctx.getRequest()
    const res = ctx.getResponse()

    const status =
      exception instanceof HttpException
        ? exception?.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const response = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: req.url,
      method: req.method,
      message: exception.message || 'Internal server error.',
    }

    Logger.error(
      `${req.method} ${req.url}`,
      JSON.stringify(response),
      'HttpErrorFilter',
    )

    res.status(status).json(response)
  }
}
