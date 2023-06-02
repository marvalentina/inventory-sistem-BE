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

import { JuncalInventoryService } from '../services/juncalInventory.services';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateJuncalInventoryDto } from '../dtos/juncalInventory.dtos';
import { UpdateJuncalInventoryDto } from '../dtos/juncalInventory.dtos';

@ApiTags('JuncalInventory')
@Controller('juncalInventory')
export class JuncalInventoryController {
  constructor(private juncalInventoryService: JuncalInventoryService) {}

  @Get()
  getJuncalInventory() {
    return this.juncalInventoryService.findAll();
  }

  @Get('filtro')
  newFilter(): string {
    return 'Nuevo filtro';
  }

  @Get(':juncalInventoryID')
  @HttpCode(HttpStatus.ACCEPTED)
  getOneInventory(
    @Param('juncalInventoryID', ParseIntPipe) juncalInventoryID: number,
  ) {
    return this.juncalInventoryService.findOne(juncalInventoryID);
  }

  @Post()
  create(@Body() payload: CreateJuncalInventoryDto) {
    return this.juncalInventoryService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateJuncalInventoryDto) {
    return this.juncalInventoryService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.juncalInventoryService.remove(id);
  }
}
