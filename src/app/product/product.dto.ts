import { IsNotEmpty, IsNumber, IsBoolean, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string

  @IsNumber()
  @ApiProperty()
  price: number

  @IsBoolean()
  @ApiProperty()
  inStock: boolean
}
