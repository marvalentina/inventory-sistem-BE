import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MirandaInventory } from './../entities/mirandaInventory.entity';
import { CreateMirandaInventoryDto } from './../dtos/mirandaInventory.dtos';
import { UpdateMirandaInventoryDto } from '../dtos/mirandaInventory.dtos';
import { MaterialsService } from './materials.services';

@Injectable()
export class MirandaInventoryService {
  constructor(
    @InjectRepository(MirandaInventory)
    private mirandaInventoryRepo: Repository<MirandaInventory>,
    private materialService: MaterialsService,
  ) {}

  findAll() {
    return this.mirandaInventoryRepo.find({
      relations: ['material'],
    });
  }

  async findOne(id: number) {
    const mirandaInventory = await this.mirandaInventoryRepo.findOne({
      where: { id },
      relations: ['material'],
    });
    if (!mirandaInventory) {
      throw new NotFoundException(`inventory line #${id} not found`);
    }
    return mirandaInventory;
  }

  async create(data: CreateMirandaInventoryDto) {
    const newInventory = this.mirandaInventoryRepo.create({
      quantity: data.quantity,
    });
    if (data.materialId) {
      const material = await this.materialService.findOne(data.materialId);
      newInventory.material = material;
    }
    return this.mirandaInventoryRepo.save(newInventory);
  }

  async update(id: number, changes: UpdateMirandaInventoryDto) {
    const mirandaInventory = await this.mirandaInventoryRepo.findOneBy({ id });
    this.mirandaInventoryRepo.merge(mirandaInventory, changes);
    return this.mirandaInventoryRepo.save(mirandaInventory);
  }

  remove(id: number) {
    return this.mirandaInventoryRepo.delete(id);
  }
}
