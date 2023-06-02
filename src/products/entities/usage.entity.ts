import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Product } from './product.entity';

import { Expose, Exclude } from 'class-transformer';

@Entity()
export class Usage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.usage)
  user: User;

  @ManyToMany(() => Product, (products) => products.usage)
  @JoinTable({
    name: 'usage_products',
    joinColumn: {
      name: 'usage_id',
    },
    inverseJoinColumn: {
      name: 'product_id',
    },
  })
  products: Product[];

  @Column({ type: 'float' })
  quantity: number;

  @Column({ type: 'varchar' })
  branch: string;

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
}
