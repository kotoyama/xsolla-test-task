import {
  Column,
  Entity,
  ManyToOne,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Category } from '../category/category.entity'

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  price: number

  @Column()
  inStock: boolean

  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  category: Category
}
