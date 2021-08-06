import { IsOptional, IsNumber, Min } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { ArgsType, ObjectType, Int, Field } from '@nestjs/graphql'

@ObjectType()
export class PaginationParams {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Field({ nullable: true })
  @ApiPropertyOptional({ minimum: 0, default: 0 })
  offset: number

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Field({ nullable: true })
  @ApiPropertyOptional({ minimum: 1, default: 10 })
  limit: number
}

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  offset: number

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  limit: number
}

interface IEdgeType<T> {
  cursor: string
  node: T
}

export interface IPaginatedType<T> {
  edges: IEdgeType<T>[]
  nodes: T[]
  totalCount: number
  hasNextPage: boolean
}
