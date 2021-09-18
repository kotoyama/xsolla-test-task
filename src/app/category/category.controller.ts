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

import { CategoryDto } from './category.dto'
import { CategoryService } from './category.service'

import { PaginationSearchParams } from '../../core/utils'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesAllowed } from '../auth/decorators/roles.decorator'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Role } from '../auth/types'

@Controller('categories')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('categories')
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @RolesAllowed(Role.ADMIN, Role.CONSUMER, Role.SUPPLIER)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiOperation({ summary: 'Get all categories' })
  getAll(@Query() { offset, limit, search }: PaginationSearchParams) {
    if (search) {
      return this.categoryService.searchCategory(offset, limit, search)
    }
    return this.categoryService.getAllCategories(offset, limit)
  }

  @Get(':id')
  @RolesAllowed(Role.ADMIN, Role.CONSUMER, Role.SUPPLIER)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOperation({ summary: 'Get category by id' })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getCategoryById(id)
  }

  @Post()
  @RolesAllowed(Role.ADMIN, Role.SUPPLIER)
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiOperation({ summary: 'Create new category' })
  create(@Body() category: CategoryDto) {
    return this.categoryService.createCategory(category)
  }

  @Put(':id')
  @RolesAllowed(Role.ADMIN, Role.SUPPLIER)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOperation({ summary: 'Update category by id' })
  update(@Param('id', ParseIntPipe) id: number, @Body() category: CategoryDto) {
    return this.categoryService.updateCategory(id, category)
  }

  @Delete(':id')
  @RolesAllowed(Role.ADMIN, Role.SUPPLIER)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOperation({ summary: 'Delete category by id' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteCategoryById(id)
  }
}
