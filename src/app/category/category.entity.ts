import {
  Column,
  Entity,
  OneToMany,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ObjectType, ID, Field } from '@nestjs/graphql'
import { Product } from '../product/product.entity'
import { Paginated } from '../../core/utils/params/pagination'

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @Column()
  @Field()
  title: string

  @OneToMany(() => Product, (product) => product.category)
  @Field(() => [Product])
  products: Product[]
}

@ObjectType()
export class PagedCategories extends Paginated(Category) {}
