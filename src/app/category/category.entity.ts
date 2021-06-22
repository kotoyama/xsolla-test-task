import {
  Column,
  Entity,
  OneToMany,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Product } from '../product/product.entity'

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @OneToMany(() => Product, (product) => product.category.id, { eager: false })
  products: Product[]
}
