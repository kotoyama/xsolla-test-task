import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { CategoryDto } from './category.dto'
import { CategoryRepository } from './category.repository'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  async getAllCategories(offset = 0, limit = 10) {
    const [items, count] = await this.categoryRepository.findAndCount({
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

  async searchCategory(offset = 0, limit = 10, query: string) {
    return await this.categoryRepository.searchCategory(offset, limit, query)
  }

  async getCategoryById(id: number) {
    const result = await this.categoryRepository.findOne(id)
    if (!result) {
      throw new NotFoundException()
    }
    return result
  }

  async createCategory(category: CategoryDto) {
    return await this.categoryRepository.save(category)
  }

  async updateCategory(id: number, category: CategoryDto) {
    const result = await this.getCategoryById(id)
    await this.categoryRepository.update({ id: result.id }, category)
    return await this.categoryRepository.findOne({ where: { id } })
  }

  async deleteCategoryById(id: number) {
    const result = await this.categoryRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException()
    }
  }
}
