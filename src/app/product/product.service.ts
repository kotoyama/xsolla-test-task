import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Product } from './product.entity'
import { ProductDto } from './product.dto'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
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

  async createProduct(productDto: ProductDto) {
    return await this.productRepository.save(productDto)
  }

  async updateProduct(id: number, productDto: ProductDto) {
    const result = await this.getProductById(id)
    await this.productRepository.update({ id: result.id }, productDto)
    return await this.productRepository.findOne({ where: { id } })
  }

  async deleteProductById(id: number) {
    const result = await this.productRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException()
    }
  }
}
