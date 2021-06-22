import {
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsString,
  IsPositive,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

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
  @ApiProperty()
  categoryId: number
}
