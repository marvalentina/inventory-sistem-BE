import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MainInventory } from '../entities/mainInventory.entity';
import { CreateMainInventoryDto } from '../dtos/mainInventory.dtos';
import { UpdateMainInventoryDto } from '../dtos/mainInventory.dtos';
import { MaterialsService } from './materials.services';

@Injectable()
export class MainInventoryService {
  constructor(
    @InjectRepository(MainInventory)
    private mainInventoryRepo: Repository<MainInventory>,
    private materialService: MaterialsService,
  ) {}

  findAll() {
    return this.mainInventoryRepo.find({
      relations: ['material'],
    });
  }

  async findOne(id: number) {
    const mainInventory = await this.mainInventoryRepo.findOne({
      where: { id },
      relations: ['material'],
    });
    if (!mainInventory) {
      throw new NotFoundException(`inventory line #${id} not found`);
    }
    return mainInventory;
  }

  async create(data: CreateMainInventoryDto) {
    const newInventory = this.mainInventoryRepo.create({
      quantity: data.quantity,
    });
    if (data.materialId) {
      const material = await this.materialService.findOne(data.materialId);
      newInventory.material = material;
    }
    return this.mainInventoryRepo.save(newInventory);
  }

  async update(id: number, changes: UpdateMainInventoryDto) {
    const mainInventory = await this.mainInventoryRepo.findOneBy({ id });
    this.mainInventoryRepo.merge(mainInventory, changes);
    return this.mainInventoryRepo.save(mainInventory);
  }

  remove(id: number) {
    return this.mainInventoryRepo.delete(id);
  }
}
