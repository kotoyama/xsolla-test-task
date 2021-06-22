import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { ProductDto } from './product.dto'
import { ProductRespository } from './product.repository'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRespository)
    private productRepository: ProductRespository,
  ) {}

  async getAllProducts() {
    return await this.productRepository.find()
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
