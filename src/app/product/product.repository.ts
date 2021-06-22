import { NotFoundException } from '@nestjs/common'
import { Repository, EntityRepository } from 'typeorm'

import { Product } from './product.entity'
import { ProductDto } from './product.dto'

import { Category } from '../category/category.entity'

@EntityRepository(Product)
export class ProductRespository extends Repository<Product> {
  private async getCategory(id: number) {
    const category = await Category.findOne({
      where: { id },
    })

    if (!category) {
      throw new NotFoundException('Category was not found')
    }

    return category
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
