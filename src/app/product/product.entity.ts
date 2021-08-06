import {
  Column,
  Entity,
  ManyToOne,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ObjectType, Int, ID, Field } from '@nestjs/graphql'
import { Category } from '../category/category.entity'

@Entity()
@ObjectType()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @Column()
  @Field()
  title: string

  @Column()
  @Field(() => Int)
  price: number

  @Column()
  @Field()
  inStock: boolean

  @ManyToOne(() => Category, (category) => category.products, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Field(() => Category, { nullable: true })
  category: Category
}
