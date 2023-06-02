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

import { EntriesService } from '../services/entries.services';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateEntriesDto } from '../dtos/entries.dtos';
import { UpdateEntriesDto } from '../dtos/entries.dtos';

@ApiTags('Entries')
@Controller('entries')
export class EntriesController {
  constructor(private entriesService: EntriesService) {}

  @Get()
  getEntries() {
    return this.entriesService.findAll();
  }

  @Get('filtro')
  newFilter(): string {
    return 'Nuevo filtro';
  }

  @Get(':entriesID')
  @HttpCode(HttpStatus.ACCEPTED)
  getOneInventory(@Param('entriesID', ParseIntPipe) entriesID: number) {
    return this.entriesService.findOne(entriesID);
  }

  @Post()
  create(@Body() payload: CreateEntriesDto) {
    return this.entriesService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateEntriesDto) {
    return this.entriesService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.entriesService.remove(id);
  }
}
