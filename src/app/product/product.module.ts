import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductRepository } from './product.repository'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { ProductResolver } from './product.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository])],
  controllers: [ProductController],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}
