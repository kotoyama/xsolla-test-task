import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductRepository } from './product.repository'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { ProductResolver } from './product.resolver'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository]), AuthModule],
  controllers: [ProductController],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}
