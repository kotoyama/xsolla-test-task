import { IsNumber, IsOptional, IsBoolean, Min } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { ArgsType, Field, Int } from '@nestjs/graphql'

import { PaginationSearchQueryArgs } from './search'

export class FilterParams {
  @IsNumber()
  @IsOptional()
  @Min(0)
  @ApiPropertyOptional({ minimum: 0 })
  priceFrom: number

  @IsNumber()
  @IsOptional()
  @Min(1)
  @ApiPropertyOptional()
  @ApiPropertyOptional({ minimum: 1 })
  priceTo: number

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  inStock: boolean

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  categoryId: number
}

@ArgsType()
export class PaginationFilterArgs extends PaginationSearchQueryArgs {
  @Field(() => Int, { nullable: true })
  priceFrom: number

  @Field(() => Int, { nullable: true })
  priceTo: number

  @Field({ nullable: true })
  inStock: boolean

  @Field(() => Int, { nullable: true })
  categoryId: number
}
