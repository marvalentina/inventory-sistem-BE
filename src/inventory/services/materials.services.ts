import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Material } from '../entities/material.entity';
import { CreateMaterialDto } from '../dtos/materials.dtos';
import { UpdateMaterialDto } from '../dtos/materials.dtos';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material) private materialRepo: Repository<Material>,
  ) {}

  findAll() {
    return this.materialRepo.find();
  }

  async findOne(id: number) {
    const material = await this.materialRepo.findOneBy({ id });
    if (!material) {
      throw new NotFoundException(`material #${id} not found`);
    }
    return material;
  }

  create(data: CreateMaterialDto) {
    const newMaterial = this.materialRepo.create(data);
    return this.materialRepo.save(newMaterial);
  }

  async update(id: number, changes: UpdateMaterialDto) {
    const material = await this.materialRepo.findOneBy({ id });
    this.materialRepo.merge(material, changes);
    return this.materialRepo.save(material);
  }

  remove(id: number) {
    return this.materialRepo.delete(id);
  }
}
