import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CategoryRespository } from './category.repository'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRespository])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
