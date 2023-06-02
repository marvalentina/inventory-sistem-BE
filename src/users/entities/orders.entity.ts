import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Expose, Exclude } from 'class-transformer';

import { User } from '../../users/entities/user.entity';
import { OrderItem } from '../entities/order-item.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, default: '', nullable: false })
  provider: string;

  @Column({ type: 'varchar', nullable: false, default: '' })
  bill: string;

  @Column({ type: 'float', default: 0, nullable: false })
  total_price: number;

  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @Exclude()
  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

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
  get materials() {
    if (this.items) {
      return this.items
        .filter((item) => !!item)
        .map((item) => ({
          ...item.material,
          quantity: item.quantity,
          itemId: item.id,
        }));
    }
    return [];
  }
}
