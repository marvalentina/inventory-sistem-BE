import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Entries } from '../entities/entries.entity';
import { CreateEntriesDto } from '../dtos/entries.dtos';
import { UpdateEntriesDto } from '../dtos/entries.dtos';
import { MaterialsService } from './materials.services';
import { UsersService } from '../../users/services/user.services';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entries)
    private entriesRepo: Repository<Entries>,
    private materialService: MaterialsService,
    private userService: UsersService,
  ) {}

  findAll() {
    return this.entriesRepo.find({
      relations: ['material', 'user'],
    });
  }

  async findOne(id: number) {
    const entries = await this.entriesRepo.findOneBy({ id });
    if (!entries) {
      throw new NotFoundException(`entrie line #${id} not found`);
    }
    return entries;
  }

  async create(data: CreateEntriesDto) {
    const newEntry = this.entriesRepo.create(data);
    if (data.materialId) {
      const material = await this.materialService.findOne(data.materialId);
      newEntry.material = material;
    }
    if (data.userId) {
      const user = await this.userService.findOne(data.userId);
      newEntry.user = user;
    }
    return this.entriesRepo.save(newEntry);
  }

  async update(id: number, changes: UpdateEntriesDto) {
    const entries = await this.entriesRepo.findOneBy({ id });
    if (changes.materialId) {
      const material = await this.materialService.findOne(changes.materialId);
      entries.material = material;
    }
    if (changes.userId) {
      const user = await this.userService.findOne(changes.userId);
      entries.user = user;
    }
    this.entriesRepo.merge(entries, changes);
    return this.entriesRepo.save(entries);
  }

  remove(id: number) {
    return this.entriesRepo.delete(id);
  }
}
