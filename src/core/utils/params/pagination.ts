import { IsOptional, IsNumber, Min } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class PaginationParams {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiPropertyOptional()
  offset: number

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiPropertyOptional()
  limit: number
}
