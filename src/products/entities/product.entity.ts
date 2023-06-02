import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  Index,
  OneToMany,
} from 'typeorm';

import { Usage } from './usage.entity';
import { ProductMaterial } from './product-material.entity';

@Entity({ name: 'products' })
@Index(['price', 'name'])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToMany(() => Usage, (usage) => usage.products)
  usage: Usage[];

  @OneToMany(() => ProductMaterial, (material) => material.product)
  materials: ProductMaterial[];

  @Index()
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
}
