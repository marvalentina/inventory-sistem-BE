import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/orders.entity';
import { CreateOrdersDto } from '../dtos/order.dtos';
//import { UpdateOrdersDto } from '../dtos/order.dtos';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.orderRepo.find({
      relations: ['items', 'items.material'],
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['items', 'items.material'],
    });
    if (!order) {
      throw new NotFoundException(`entrie line #${id} not found`);
    }
    return order;
  }

  async create(data: CreateOrdersDto) {
    const newOrder = await this.orderRepo.create({
      provider: data.provider,
      total_price: data.total_price,
      bill: data.bill,
    });
    if (data.userId) {
      const user = await this.userRepo.findOneBy({ id: data.userId });
      newOrder.user = user;
    }
    return this.orderRepo.save(newOrder);
  }

  /*async update(id: number, changes: UpdateOrdersDto) {
    const order = await this.orderRepo.findOneBy({ id });
    if (changes.userId) {
      const user = await this.userRepo.findOneBy({ id: changes.userId });
      order.user = user;
    }
    this.orderRepo.merge(order, changes);
    return this.orderRepo.save(order);
  }
*/

  remove(id: number) {
    return this.orderRepo.delete(id);
  }

  ordersByCustomer(userId: number) {
    return this.orderRepo.find({
      where: {
        id: userId,
      },
    });
  }
}
