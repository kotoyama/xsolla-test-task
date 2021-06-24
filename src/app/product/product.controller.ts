import {
  Get,
  Body,
  Post,
  Put,
  Query,
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

import { ProductDto } from './product.dto'
import { ProductService } from './product.service'

import { ValidationPipe } from '../../core/pipes'
import { FilterParams, PaginationSearchParams } from '../../core/utils/params'

@Controller('products')
@ApiTags('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiOperation({ summary: 'Get all products' })
  getAll(
    @Query() paginationSearchParams: PaginationSearchParams,
    @Query() filterParams: FilterParams,
  ) {
    const { offset, limit, search } = paginationSearchParams
    const { priceFrom, priceTo, inStock, categoryId } = filterParams

    if (search || priceFrom || priceTo || inStock || categoryId) {
      return this.productService.filterProducts(
        paginationSearchParams,
        filterParams,
      )
    }

    return this.productService.getAllProducts(offset, limit)
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
  create(@Body(new ValidationPipe()) product: ProductDto) {
    return this.productService.createProduct(product)
  }

  @Put(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOperation({ summary: 'Update product by id' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) product: ProductDto,
  ) {
    return this.productService.updateProduct(id, product)
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
