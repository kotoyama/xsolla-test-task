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
  UseGuards,
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger'

import { ProductDto } from './product.dto'
import { ProductService } from './product.service'

import { FilterParams, PaginationSearchParams } from '../../core/utils'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('products')
@UseGuards(JwtAuthGuard)
@ApiTags('products')
@ApiBearerAuth('JWT-auth')
@ApiUnauthorizedResponse()
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
    if (Object.values(filterParams).some((param) => !!param) || search) {
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
  create(@Body() product: ProductDto) {
    return this.productService.createProduct(product)
  }

  @Put(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOperation({ summary: 'Update product by id' })
  update(@Param('id', ParseIntPipe) id: number, @Body() product: ProductDto) {
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
