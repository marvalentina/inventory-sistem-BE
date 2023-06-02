import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EntriesController } from './controllers/entries.controller';
import { EntriesService } from './services/entries.services';
import { Entries } from './entities/entries.entity';
import { OrdersController } from '../users/controllers/orders.controller';

import { RawMaterialController } from './controllers/raw-material.controller';
import { MaterialsService } from './services/materials.services';
import { Material } from './entities/material.entity';
import { MainInventoryController } from './controllers/main-inventory.controller';
import { MainInventoryService } from './services/mainInventory.services';
import { MainInventory } from './entities/mainInventory.entity';
import { JuncalInventoryController } from './controllers/juncal-inventory.controller';
import { JuncalInventoryService } from './services/juncalInventory.services';
import { JuncalInventory } from './entities/juncalInventory.entity';
import { MirandaInventoryController } from './controllers/miranda-inventory.controller';
import { UsersModule } from '../users/users.module';
import { MirandaInventoryService } from './services/miranda-inventory.service';
import { MirandaInventory } from './entities/mirandaInventory.entity';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([
      Material,
      MainInventory,
      JuncalInventory,
      MirandaInventory,
      Entries,
    ]),
  ],
  controllers: [
    EntriesController,
    OrdersController,
    RawMaterialController,
    MainInventoryController,
    JuncalInventoryController,
    MirandaInventoryController,
  ],
  providers: [
    MaterialsService,
    MainInventoryService,
    JuncalInventoryService,
    EntriesService,
    MirandaInventoryService,
  ],
  exports: [
    MaterialsService,
    MainInventoryService,
    JuncalInventoryService,
    EntriesService,
  ],
})
export class InventoryModule {}
