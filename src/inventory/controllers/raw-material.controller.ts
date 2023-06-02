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

import { MaterialsService } from '../services/materials.services';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateMaterialDto } from '../dtos/materials.dtos';
import { UpdateMaterialDto } from '../dtos/materials.dtos';

@ApiTags('Material')
@Controller('material')
export class RawMaterialController {
  constructor(private materialService: MaterialsService) {}

  @Get()
  getMaterials() {
    return this.materialService.findAll();
  }

  @Get('filtro')
  newFilter(): string {
    return 'Nuevo filtro';
  }

  @Get(':materialID')
  @HttpCode(HttpStatus.ACCEPTED)
  getMaterial(@Param('materialID', ParseIntPipe) materialID: number) {
    return this.materialService.findOne(materialID);
  }

  @Post()
  create(@Body() payload: CreateMaterialDto) {
    return this.materialService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateMaterialDto) {
    return this.materialService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.materialService.remove(id);
  }
}
