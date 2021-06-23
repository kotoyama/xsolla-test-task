import { Repository, EntityRepository } from 'typeorm'

import { Category } from './category.entity'

@EntityRepository(Category)
export class CategoryRespository extends Repository<Category> {
  async searchCategory(offset: number, limit: number, query: string) {
    const [items, count] = await this.createQueryBuilder('category')
      .skip(offset)
      .take(limit)
      .where('LOWER(category.title) LIKE LOWER(:query)', {
        query: `%${query}%`,
      })
      .orderBy('category.id', 'ASC')
      .getManyAndCount()

    return {
      count,
      items,
    }
  }
}
