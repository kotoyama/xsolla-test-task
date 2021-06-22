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

import { CategoryDto } from './category.dto'
import { CategoryService } from './category.service'

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiOperation({ summary: 'Get all categories' })
  getAll() {
    return this.categoryService.getAllCategories()
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
  create(@Body(new ValidationPipe()) categoryDto: CategoryDto) {
    return this.categoryService.createCategory(categoryDto)
  }

  @Put(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOperation({ summary: 'Update category by id' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) categoryDto: CategoryDto,
  ) {
    return this.categoryService.updateCategory(id, categoryDto)
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
