import { Resolver, Args, Query, Int } from '@nestjs/graphql'
import { Inject } from '@nestjs/common'

import { ProductService } from './product.service'
import { Product, PagedProducts } from './product.entity'
import { PaginationFilterArgs } from '../../core/utils'

@Resolver(() => Product)
export class ProductResolver {
  constructor(@Inject(ProductService) private productService: ProductService) {}

  @Query(() => Product)
  async product(@Args('id', { type: () => Int }) id: number) {
    return await this.productService.getProductById(id)
  }

  @Query(() => PagedProducts)
  async products(@Args() paginationFilter: PaginationFilterArgs) {
    const { limit, offset, ...filters } = paginationFilter
    const { search, ...filterParams } = filters
    return Object.values(filters).some((filter) => !!filter)
      ? await this.productService.filterProducts(
          { offset, limit, search },
          filterParams,
        )
      : await this.productService.getAllProducts(offset, limit)
  }
}
