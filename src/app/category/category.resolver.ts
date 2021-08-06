import { Resolver, Args, Query, Int } from '@nestjs/graphql'
import { Inject } from '@nestjs/common'

import { CategoryService } from './category.service'
import { Category, PagedCategories } from './category.entity'
import { PaginationSearchQueryArgs } from '../../core/utils/params'

@Resolver(() => Category)
export class CategoryResolver {
  constructor(
    @Inject(CategoryService) private categoryService: CategoryService,
  ) {}

  @Query(() => Category)
  async category(@Args('id', { type: () => Int }) id: number) {
    return await this.categoryService.getCategoryById(id)
  }

  @Query(() => PagedCategories)
  async categories(@Args() paginationSearchQuery: PaginationSearchQueryArgs) {
    const { limit, offset, search } = paginationSearchQuery
    return search
      ? await this.categoryService.searchCategory(offset, limit, search)
      : await this.categoryService.getAllCategories(offset, limit)
  }
}
