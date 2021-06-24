import { IsNumber, IsOptional, IsBoolean, Min } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

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
