import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Category } from './category.entity'
import { CategoryDto } from './category.dto'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getAllCategories() {
    return await this.categoryRepository.find()
  }

  async getCategoryById(id: number) {
    const result = await this.categoryRepository.findOne(id)
    if (!result) {
      throw new NotFoundException()
    }
    return result
  }

  async createCategory(categoryDto: CategoryDto) {
    return await this.categoryRepository.save(categoryDto)
  }

  async updateCategory(id: number, categoryDto: CategoryDto) {
    const result = await this.getCategoryById(id)
    await this.categoryRepository.update({ id: result.id }, categoryDto)
    return await this.categoryRepository.findOne({ where: { id } })
  }

  async deleteCategoryById(id: number) {
    const result = await this.categoryRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException()
    }
  }
}
