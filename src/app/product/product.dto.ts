import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsString,
  IsPositive,
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string

  @IsNumber()
  @IsPositive()
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
