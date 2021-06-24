import { Repository, EntityRepository } from 'typeorm'

import { Product } from './product.entity'
import { ProductDto } from './product.dto'

import { Category } from '../category/category.entity'
import { FilterParams, PaginationSearchParams } from '../../core/utils/params'

@EntityRepository(Product)
export class ProductRespository extends Repository<Product> {
  private async getCategory(id: number) {
    const category = await Category.findOne({
      where: { id },
    })

    if (!category) {
      return null
    }

    return category
  }

  async filterProducts(
    paginationSearchParams: PaginationSearchParams,
    filterParams: FilterParams,
  ) {
    const { offset = 0, limit = 10, search: query } = paginationSearchParams
    const { priceFrom, priceTo, inStock, categoryId } = filterParams
    const qb = this.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.price >= :priceFrom', {
        priceFrom: priceFrom || 0,
      })

    if (categoryId) {
      qb.andWhere('product.categoryId = :categoryId', {
        categoryId,
      })
    }

    if (priceTo) {
      qb.andWhere('product.price < :priceTo', {
        priceTo,
      })
    }

    if (inStock) {
      qb.andWhere('product.inStock = :inStock', {
        inStock,
      })
    }

    if (query) {
      qb.andWhere('LOWER(product.title) LIKE LOWER(:query)', {
        query: `%${query}%`,
      })
    }

    const [items, count] = await qb
      .skip(offset)
      .take(limit)
      .orderBy('product.id', 'ASC')
      .getManyAndCount()

    return {
      count,
      items,
    }
  }

  async createProduct(product: ProductDto) {
    const { title, price, inStock, categoryId } = product
    const result = new Product()
    const category = await this.getCategory(categoryId)

    result.title = title
    result.price = price
    result.inStock = inStock
    result.category = category

    return await result.save()
  }

  async updateProduct(result: Product, product: ProductDto) {
    const { title, price, inStock, categoryId } = product
    const category = await this.getCategory(categoryId)

    result.title = title
    result.price = price
    result.inStock = inStock
    result.category = category

    return await result.save()
  }
}
