import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MaterialsService } from './../../inventory/services/materials.services';
import { Repository } from 'typeorm';
import {
  CreateProductMaterialDto,
  UpdateProductMaterialDto,
} from '../dtos/product-material.dtos';
import { ProductMaterial } from '../entities/product-material.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductMaterialsService {
  constructor(
    private materialService: MaterialsService,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(ProductMaterial)
    private productMaterialRepo: Repository<ProductMaterial>,
  ) {}

  findAll() {
    return this.productMaterialRepo.find({
      relations: ['product', 'product.materials', 'product.materials.material'],
    });
  }

  findOne(id: number) {
    return this.productMaterialRepo.findOne({
      where: { id },
      relations: ['product', 'product.materials', 'product.materials.material'],
    });
  }

  async create(data: CreateProductMaterialDto) {
    const product = await this.productRepo.findOneBy({ id: data.productId });
    const material = await this.materialService.findOne(data.materialId);
    const newproductMaterial = new ProductMaterial();
    newproductMaterial.product = product;
    newproductMaterial.material = material;
    newproductMaterial.quantity = data.quantity;
    return this.productMaterialRepo.save(newproductMaterial);
  }

  async update(id: number, changes: UpdateProductMaterialDto) {
    const productMaterial = await this.productMaterialRepo.findOneBy({ id });
    if (changes.productId) {
      const product = await this.productRepo.findOneBy({
        id: changes.productId,
      });
      productMaterial.product = product;
    }
    if (changes.materialId) {
      const material = await this.materialService.findOne(changes.materialId);
      productMaterial.material = material;
    }
    if (changes.quantity) {
      productMaterial.quantity = changes.quantity;
    }
    return this.productMaterialRepo.save(productMaterial);
  }

  delete(id: number) {
    return this.productMaterialRepo.delete(id);
  }
}
