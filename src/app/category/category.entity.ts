import {
  Column,
  Entity,
  OneToMany,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ObjectType, Int, Field } from '@nestjs/graphql'
import { Product } from '../product/product.entity'

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number

  @Column()
  @Field()
  title: string

  @OneToMany(() => Product, (product) => product.category)
  @Field(() => [Product])
  products: Product[]
}
