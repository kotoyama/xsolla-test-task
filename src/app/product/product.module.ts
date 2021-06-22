import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductRespository } from './product.repository'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

@Module({
  imports: [TypeOrmModule.forFeature([ProductRespository])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
