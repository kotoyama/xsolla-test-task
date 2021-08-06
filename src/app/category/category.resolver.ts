import { Resolver, Args, Query, Int } from '@nestjs/graphql'
import { Inject } from '@nestjs/common'
import { CategoryService } from './category.service'
import { Category } from './category.entity'
import { PaginationArgs } from '../../core/utils/params/pagination'

@Resolver(() => Category)
export class CategoryResolver {
  constructor(
    @Inject(CategoryService) private categoryService: CategoryService,
  ) {}

  @Query(() => Category)
  async category(@Args('id', { type: () => Int }) id: number) {
    return await this.categoryService.getCategoryById(id)
  }

  @Query(() => [Category])
  async categories(@Args() pagination: PaginationArgs) {
    const { limit, offset } = pagination
    return await this.categoryService.getAllCategories(offset, limit)
  }
}
