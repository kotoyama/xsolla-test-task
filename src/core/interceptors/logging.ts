import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const ctx = context.switchToHttp()
    const req = ctx.getRequest()
    const start = Date.now()

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
