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

import { MainInventoryService } from '../services/mainInventory.services';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateMainInventoryDto } from '../dtos/mainInventory.dtos';
import { UpdateMainInventoryDto } from '../dtos/mainInventory.dtos';

@ApiTags('MainInventory')
@Controller('mainInventory')
export class MainInventoryController {
  constructor(private mainInventoryService: MainInventoryService) {}

  @Get()
  getMainInventory() {
    return this.mainInventoryService.findAll();
  }

  @Get('filtro')
  newFilter(): string {
    return 'Nuevo filtro';
  }

  @Get(':mainInventoryID')
  @HttpCode(HttpStatus.ACCEPTED)
  getOneInventory(
    @Param('mainInventoryID', ParseIntPipe) mainInventoryID: number,
  ) {
    return this.mainInventoryService.findOne(mainInventoryID);
  }

  @Post()
  create(@Body() payload: CreateMainInventoryDto) {
    return this.mainInventoryService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateMainInventoryDto) {
    return this.mainInventoryService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.mainInventoryService.remove(id);
  }
}
