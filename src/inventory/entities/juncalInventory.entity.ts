import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Material } from './material.entity';

import { Expose } from 'class-transformer';

@Entity({ name: 'juncal_inventory' })
export class JuncalInventory {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Material, (material) => material.juncalInventory, {
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
