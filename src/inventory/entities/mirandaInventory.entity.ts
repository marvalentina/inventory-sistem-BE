import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Expose } from 'class-transformer';

import { Material } from './material.entity';

@Entity({ name: 'miranda_inventory' })
export class MirandaInventory {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Material, (material) => material.mirandaInventory, {
    nullable: true,
  })
  @JoinColumn({ name: 'material_id' })
  material: Material;

  @Column({ type: 'float' })
  quantity: number;

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

  @Expose()
  get total() {
    if (this.material) {
      const total_price = this.material.price * this.quantity;
      return total_price;
    }
    return 0;
  }
}
