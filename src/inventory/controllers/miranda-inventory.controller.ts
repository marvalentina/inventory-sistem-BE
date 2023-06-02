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

import { MirandaInventoryService } from '../services/miranda-inventory.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import {
  CreateMirandaInventoryDto,
  UpdateMirandaInventoryDto,
} from '../dtos/mirandaInventory.dtos';

@ApiTags('MirandaInventory')
@Controller('miranda-inventory')
export class MirandaInventoryController {
  constructor(private mirandaInventoryService: MirandaInventoryService) {}

  @Get()
  getMirandaInventory() {
    return this.mirandaInventoryService.findAll();
  }

  @Get('filtro')
  newFilter(): string {
    return 'Nuevo filtro';
  }

  @Get(':mirandaInventoryID')
  @HttpCode(HttpStatus.ACCEPTED)
  getOneInventory(
    @Param('mirandaInventoryID', ParseIntPipe) mirandaInventoryID: number,
  ) {
    return this.mirandaInventoryService.findOne(mirandaInventoryID);
  }

  @Post()
  create(@Body() payload: CreateMirandaInventoryDto) {
    return this.mirandaInventoryService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateMirandaInventoryDto) {
    return this.mirandaInventoryService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.mirandaInventoryService.remove(id);
  }
}
