import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Usage } from '../entities/usage.entity';
import { CreateUsageDto } from '../dtos/usage.dtos';
import { UpdateUsageDto } from '../dtos/usage.dtos';
import { Product } from '../entities/product.entity';
import { UsersService } from '../../users/services/user.services';
//import { User } from '../../users/entities/user.entity';

@Injectable()
export class UsageService {
  constructor(
    @InjectRepository(Usage)
    private usageRepo: Repository<Usage>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private userService: UsersService,
  ) {}

  findAll() {
    return this.usageRepo.find({
      relations: [
        'products',
        'products.materials',
        'user',
        'products.materials.material',
      ],
    });
  }

  async findOne(id: number) {
    const usage = await this.usageRepo.findOne({
      where: { id },
      relations: [
        'products',
        'products.materials',
        'user',
        'products.materials.material',
      ],
    });
    if (!usage) {
      throw new NotFoundException(`entrie line #${id} not found`);
    }
    return usage;
  }

  async create(data: CreateUsageDto) {
    const newEntry = this.usageRepo.create(data);
    if (data.productIds) {
      const products = await this.productRepo.findBy({
        id: In(data.productIds),
      });
      newEntry.products = products;
    }
    if (data.userId) {
      const user = await this.userService.findOne(data.userId);
      newEntry.user = user;
    }
    return this.usageRepo.save(newEntry);
  }

  async update(id: number, changes: UpdateUsageDto) {
    const usage = await this.usageRepo.findOneBy({ id });
    if (changes.productIds) {
      const products = await this.productRepo.findBy({
        id: In(changes.productIds),
      });
      usage.products = products;
    }
    if (changes.userId) {
      const user = await this.userService.findOne(changes.userId);
      usage.user = user;
    }
    this.usageRepo.merge(usage, changes);
    return this.usageRepo.save(usage);
  }

  async removeProductByUsage(id: number, productId: number) {
    const usage = await this.usageRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    usage.products = usage.products.filter((item) => item.id !== productId);
    return this.usageRepo.save(usage);
  }

  async addProductToUsage(id: number, productId: number) {
    const usage = await this.usageRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!usage) {
      throw new NotFoundException(`Usage #${id} not found`);
    }
    const product = await this.productRepo.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException(`product #${productId} not found`);
    }
    if (!usage.products.find((item) => item.id == productId)) {
      usage.products.push(product);
    }
    return this.usageRepo.save(usage);
  }

  remove(id: number) {
    return this.usageRepo.delete(id);
  }
}
