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
  ApiForbiddenResponse,
} from '@nestjs/swagger'

import { ProductDto } from './product.dto'
import { ProductService } from './product.service'

import { FilterParams, PaginationSearchParams } from '../../core/utils'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesAllowed } from '../auth/decorators/roles.decorator'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Role } from '../auth/types'

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('products')
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @RolesAllowed(Role.ADMIN, Role.CONSUMER, Role.SUPPLIER)
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
  @RolesAllowed(Role.ADMIN, Role.CONSUMER, Role.SUPPLIER)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOperation({ summary: 'Get product by id' })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProductById(id)
  }

  @Post()
  @RolesAllowed(Role.ADMIN, Role.SUPPLIER)
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiOperation({ summary: 'Create new product' })
  create(@Body() product: ProductDto) {
    return this.productService.createProduct(product)
  }

  @Put(':id')
  @RolesAllowed(Role.ADMIN, Role.SUPPLIER)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOperation({ summary: 'Update product by id' })
  update(@Param('id', ParseIntPipe) id: number, @Body() product: ProductDto) {
    return this.productService.updateProduct(id, product)
  }

  @Delete(':id')
  @RolesAllowed(Role.ADMIN, Role.SUPPLIER)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOperation({ summary: 'Delete product by id' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProductById(id)
  }
}
