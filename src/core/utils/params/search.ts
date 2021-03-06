import { IsString, IsOptional } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { ArgsType, Field } from '@nestjs/graphql'

import { PaginationParams, PaginationArgs } from './pagination'

export class PaginationSearchParams extends PaginationParams {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  search: string
}

@ArgsType()
export class PaginationSearchQueryArgs extends PaginationArgs {
  @Field({ nullable: true })
  search: string
}
