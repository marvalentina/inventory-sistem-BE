import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { UsageService } from '../services/usage.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateUsageDto } from '../dtos/usage.dtos';
import { UpdateUsageDto } from '../dtos/usage.dtos';

@ApiTags('Usage')
@Controller('Usage')
export class UsageController {
  constructor(private usageService: UsageService) {}

  @Get()
  getusage() {
    return this.usageService.findAll();
  }

  @Get('filtro')
  newFilter(): string {
    return 'Nuevo filtro';
  }

  @Get(':usageID')
  @HttpCode(HttpStatus.ACCEPTED)
  getOneInventory(@Param('usageID', ParseIntPipe) usageID: number) {
    return this.usageService.findOne(usageID);
  }

  @Post()
  create(@Body() payload: CreateUsageDto) {
    return this.usageService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateUsageDto) {
    return this.usageService.update(id, payload);
  }

  @Put(':id/product/:productId')
  addProductToUsage(
    @Param('id') id: number,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.usageService.addProductToUsage(id, productId);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usageService.remove(id);
  }

  @Delete(':id/product/:productId')
  deleteProduct(
    @Param('id') id: number,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.usageService.removeProductByUsage(id, productId);
  }
}
