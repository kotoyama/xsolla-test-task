import { IsString, IsOptional, IsNotEmpty } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

import { PaginationParams } from './pagination'

export class PaginationSearchParams extends PaginationParams {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  search: string
}
