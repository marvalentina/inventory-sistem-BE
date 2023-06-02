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

@Entity({ name: 'main_inventory' })
export class MainInventory {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToOne(() => Material, (material) => material.mirandaInventory, {
    nullable: true,
  })
  @JoinColumn({ name: 'material_id' })
  material: Material;

  @Expose()
  get total() {
    if (this.material) {
      const total_price = this.material.price * this.quantity;
      return total_price;
    }
    return 0;
  }
}
