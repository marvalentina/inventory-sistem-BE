import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ProductsService } from './../services/product.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Public } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';

import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductDto,
} from '../dtos/products.dtos';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List of products' })
  getProducts(@Query() params: FilterProductDto) {
    return this.productService.findAll(params);
  }

  @Public()
  @Get('filtro')
  newFilter(): string {
    return 'Nuevo filtro';
  }

  @Public()
  @Get(':productID')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productID', ParseIntPipe) productID: number) {
    return this.productService.findOne(productID);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    return this.productService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
