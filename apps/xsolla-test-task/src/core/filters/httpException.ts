import {
  Catch,
  Logger,
  HttpStatus,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common'
import { GqlArgumentsHost, GqlContextType } from '@nestjs/graphql'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const status =
      exception instanceof HttpException
        ? exception?.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    if (host.getType<GqlContextType>() === 'graphql') {
      const gqlHost = GqlArgumentsHost.create(host)
      const { parentType, fieldName } = gqlHost.getInfo()

      Logger.error(
        `${parentType} ${fieldName} code ${status}`,
        'GqlHttpErrorFilter',
      )
    }

    if (host.getType() === 'http') {
      const ctx = host.switchToHttp()
      const req = ctx.getRequest()
      const res = ctx.getResponse()

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
}
