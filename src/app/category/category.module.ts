import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CategoryRepository } from './category.repository'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { CategoryResolver } from './category.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryResolver],
})
export class CategoryModule {}
