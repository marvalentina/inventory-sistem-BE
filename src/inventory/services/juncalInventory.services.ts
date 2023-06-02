import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JuncalInventory } from '../entities/juncalInventory.entity';
import { CreateJuncalInventoryDto } from '../dtos/juncalInventory.dtos';
import { UpdateJuncalInventoryDto } from '../dtos/juncalInventory.dtos';
import { MaterialsService } from './materials.services';

@Injectable()
export class JuncalInventoryService {
  constructor(
    @InjectRepository(JuncalInventory)
    private juncalInventoryRepo: Repository<JuncalInventory>,
    private materialService: MaterialsService,
  ) {}

  findAll() {
    return this.juncalInventoryRepo.find({
      relations: ['material'],
    });
  }

  async findOne(id: number) {
    const juncalInventory = await this.juncalInventoryRepo.findOne({
      where: { id },
      relations: ['material'],
    });
    if (!juncalInventory) {
      throw new NotFoundException(`inventory #${id} not found`);
    }
    return juncalInventory;
  }

  async create(data: CreateJuncalInventoryDto) {
    const newInventory = this.juncalInventoryRepo.create({
      quantity: data.quantity,
    });
    if (data.materialId) {
      const material = await this.materialService.findOne(data.materialId);
      newInventory.material = material;
    }
    return this.juncalInventoryRepo.save(newInventory);
  }

  async update(id: number, changes: UpdateJuncalInventoryDto) {
    const juncalInventory = await this.juncalInventoryRepo.findOneBy({ id });
    this.juncalInventoryRepo.merge(juncalInventory, changes);
    return this.juncalInventoryRepo.save(juncalInventory);
  }

  remove(id: number) {
    return this.juncalInventoryRepo.delete(id);
  }
}
