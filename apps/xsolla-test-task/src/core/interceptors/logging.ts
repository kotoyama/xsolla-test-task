import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common'
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const start = Date.now()

    if (context.getType<GqlContextType>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context)
      const { parentType, fieldName } = gqlContext.getInfo()

      return next
        .handle()
        .pipe(
          tap(() =>
            Logger.log(
              `${parentType} ${fieldName} ${Date.now() - start}ms`,
              'GqlLoggingInterceptor',
            ),
          ),
        )
    }

    const ctx = context.switchToHttp()
    const req = ctx.getRequest()

    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.log(
            `${req.method} ${req.url} ${Date.now() - start}ms`,
            'LoggingInterceptor',
          ),
        ),
      )
  }
}
