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

import { CategoryDto } from './category.dto'
import { CategoryService } from './category.service'

import { ValidationPipe } from '../../core/pipes'
import { PaginationParams } from '../../utils/pagination'

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiOperation({ summary: 'Get all categories' })
  getAll(@Query() { offset, limit }: PaginationParams) {
    return this.categoryService.getAllCategories(offset, limit)
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOperation({ summary: 'Get category by id' })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getCategoryById(id)
  }

  @Post()
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiOperation({ summary: 'Create new category' })
  create(@Body(new ValidationPipe()) category: CategoryDto) {
    return this.categoryService.createCategory(category)
  }

  @Put(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOperation({ summary: 'Update category by id' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) category: CategoryDto,
  ) {
    return this.categoryService.updateCategory(id, category)
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOperation({ summary: 'Delete category by id' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteCategoryById(id)
  }
}
