import { IsOptional, IsNumber, Min } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

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
