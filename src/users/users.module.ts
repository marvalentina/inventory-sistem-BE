import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/user.controller';
import { UsersService } from './services/user.services';
import { User } from './entities/user.entity';

import { Order } from './entities/orders.entity';
import { OrderItem } from '../users/entities/order-item.entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from '../users/controllers/orders.controller';
import { OrderItemController } from './controllers/order-item.controller';
import { OrderItemService } from './services/order-item.service';

import { InventoryModule } from '../inventory/inventory.module';
import { ProfileController } from './controllers/profile.controller';

@Module({
  imports: [
    forwardRef(() => InventoryModule),
    TypeOrmModule.forFeature([User, OrderItem, Order]),
  ],
  controllers: [
    UsersController,
    OrdersController,
    OrderItemController,
    ProfileController,
  ],
  providers: [UsersService, OrdersService, OrderItemService],
  exports: [UsersService, OrdersService],
})
export class UsersModule {}
