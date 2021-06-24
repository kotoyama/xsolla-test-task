import { Module } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ormConfig } from './config/typeorm.config'

import { HttpExceptionFilter } from './core/filters'
import { LoggingInterceptor } from './core/interceptors'

import { ProductModule } from './app/product/product.module'
import { CategoryModule } from './app/category/category.module'

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), ProductModule, CategoryModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
