import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CategoryRepository } from './category.repository'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { CategoryResolver } from './category.resolver'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository]), AuthModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryResolver],
})
export class CategoryModule {}
