import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { ProductDto } from './product.dto'
import { ProductRepository } from './product.repository'

import { FilterParams, PaginationSearchParams } from '../../core/utils'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async getAllProducts(offset = 0, limit = 10) {
    const [items, count] = await this.productRepository.findAndCount({
      order: {
        id: 'ASC',
      },
      skip: offset,
      take: limit,
    })

    return {
      count,
      items,
    }
  }

  async filterProducts(
    paginationSearchParams: PaginationSearchParams,
    filterParams: FilterParams,
  ) {
    return await this.productRepository.filterProducts(
      paginationSearchParams,
      filterParams,
    )
  }

  async getProductById(id: number) {
    const result = await this.productRepository.findOne(id)
    if (!result) {
      throw new NotFoundException()
    }
    return result
  }

  async createProduct(product: ProductDto) {
    return await this.productRepository.createProduct(product)
  }

  async updateProduct(id: number, product: ProductDto) {
    const result = await this.getProductById(id)
    return await this.productRepository.updateProduct(result, product)
  }

  async deleteProductById(id: number) {
    const result = await this.productRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException()
    }
  }
}
