import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  CreateProductMaterialDto,
  UpdateProductMaterialDto,
} from '../dtos/product-material.dtos';
import { ProductMaterialsService } from '../services/product-materials.service';

@Controller('product-materials')
export class ProductMaterialsController {
  constructor(private productMaterialService: ProductMaterialsService) {}

  @Post('')
  create(@Body() payload: CreateProductMaterialDto) {
    return this.productMaterialService.create(payload);
  }

  @Get()
  getOrders() {
    return this.productMaterialService.findAll();
  }

  @Get(':itemID')
  getOneItem(@Param('itemID', ParseIntPipe) itemID: number) {
    return this.productMaterialService.findOne(itemID);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProductMaterialDto) {
    return this.productMaterialService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productMaterialService.delete(id);
  }
}
