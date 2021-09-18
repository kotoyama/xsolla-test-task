/* eslint-disable @typescript-eslint/no-explicit-any */
import { IsOptional, IsNumber, Min } from 'class-validator'
import { Type } from '@nestjs/common'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { ArgsType, ObjectType, Int, Field } from '@nestjs/graphql'

export class PaginationParams {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiPropertyOptional({ minimum: 0, default: 0 })
  offset: number

  @IsOptional()
  @IsNumber()
  @Min(1)
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

export function Paginated<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef], { nullable: true })
    items: T[]

    @Field(() => Int)
    count: number
  }
  return PaginatedType
}
