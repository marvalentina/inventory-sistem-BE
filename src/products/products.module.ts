import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/product.service';
import { Product } from './entities/product.entity';
import { UsageController } from './controllers/usage.controller';
import { Usage } from './entities/usage.entity';
import { UsageService } from './services/usage.service';
import { UsersModule } from '../users/users.module';
import { ProductMaterial } from './entities/product-material.entity';
import { ProductMaterialsController } from './controllers/product-materials.controller';
import { ProductMaterialsService } from './services/product-materials.service';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
  imports: [
    forwardRef(() => InventoryModule),
    UsersModule,
    TypeOrmModule.forFeature([ProductMaterial, Product, Usage]),
  ],
  controllers: [
    ProductsController,
    UsageController,
    ProductMaterialsController,
  ],
  providers: [ProductsService, UsageService, ProductMaterialsService],
  exports: [ProductsService, UsageService],
})
export class ProductsModule {}
