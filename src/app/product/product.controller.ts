import {
  Get,
  Body,
  Post,
  Put,
  Param,
  Delete,
  Controller,
  ParseIntPipe,
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger'

import { ValidationPipe } from '../../core/pipes'

import { ProductDto } from './product.dto'
import { ProductService } from './product.service'

@Controller('products')
@ApiTags('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiOperation({ summary: 'Get all products' })
  getAll() {
    return this.productService.getAllProducts()
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOperation({ summary: 'Get product by id' })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProductById(id)
  }

  @Post()
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiOperation({ summary: 'Create new product' })
  create(@Body(new ValidationPipe()) productDto: ProductDto) {
    return this.productService.createProduct(productDto)
  }

  @Put(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOperation({ summary: 'Update product by id' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) productDto: ProductDto,
  ) {
    return this.productService.updateProduct(id, productDto)
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOperation({ summary: 'Delete product by id' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProductById(id)
  }
}
