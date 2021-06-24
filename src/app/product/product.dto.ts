import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsString,
  Min,
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string

  @IsNumber()
  @Min(0)
  @ApiProperty()
  price: number

  @IsBoolean()
  @ApiProperty()
  inStock: boolean

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  categoryId: number
}
