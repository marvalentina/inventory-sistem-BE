import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Material } from './material.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Entries {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.entry)
  user: User;

  @Column({ type: 'float' })
  quantity: number;

  @Column({ type: 'varchar', nullable: false, default: '' })
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

  @ManyToOne(() => Material, (material) => material.entry)
  @JoinColumn({ name: 'material_id' })
  material: Material;
}
