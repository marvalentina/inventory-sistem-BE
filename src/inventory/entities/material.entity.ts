import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';

import { MainInventory } from './mainInventory.entity';
import { JuncalInventory } from './juncalInventory.entity';
import { MirandaInventory } from './mirandaInventory.entity';
import { Entries } from './entries.entity';
import { Order } from '../../users/entities/orders.entity';
import { Product } from './../../products/entities/product.entity';

@Entity({ name: 'materials' })
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'varchar', length: 40 })
  unit: string;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToOne(() => MainInventory, (mainInventory) => mainInventory.material, {
    nullable: true,
  })
  mainInventory: MainInventory;

  @OneToOne(
    () => JuncalInventory,
    (juncalInventory) => juncalInventory.material,
    {
      nullable: true,
    },
  )
  juncalInventory: JuncalInventory;

  @OneToOne(
    () => MirandaInventory,
    (mirandaInventory) => mirandaInventory.material,
    {
      nullable: true,
    },
  )
  mirandaInventory: MirandaInventory;

  @OneToMany(() => Entries, (entry) => entry.material)
  entry: Entries[];

  @ManyToMany(() => Order, (order) => order.items)
  order: Order[];

  @ManyToMany(() => Product, (product) => product.materials)
  product: Product[];
}
