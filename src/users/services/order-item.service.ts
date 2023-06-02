import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MaterialsService } from './../../inventory/services/materials.services';
import { Repository } from 'typeorm';
import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
} from '../dtos/order-item.dtos';
import { OrderItem } from '../entities/order-item.entity';
import { Order } from '../entities/orders.entity';

@Injectable()
export class OrderItemService {
  constructor(
    private materialService: MaterialsService,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
  ) {}

  findAll() {
    return this.orderItemRepo.find({
      relations: ['order', 'order.user'],
    });
  }

  findOne(id: number) {
    return this.orderItemRepo.findOne({
      where: { id },
      relations: ['order', 'order.user'],
    });
  }

  async create(data: CreateOrderItemDto) {
    const order = await this.orderRepo.findOneBy({ id: data.orderId });
    const material = await this.materialService.findOne(data.materialId);
    const newOrderItem = new OrderItem();
    newOrderItem.order = order;
    newOrderItem.material = material;
    newOrderItem.quantity = data.quantity;
    return this.orderItemRepo.save(newOrderItem);
  }

  async update(id: number, changes: UpdateOrderItemDto) {
    const orderItem = await this.orderItemRepo.findOneBy({ id });
    if (changes.orderId) {
      const order = await this.orderRepo.findOneBy({ id: changes.orderId });
      orderItem.order = order;
    }
    if (changes.materialId) {
      const material = await this.materialService.findOne(changes.materialId);
      orderItem.material = material;
    }
    if (changes.quantity) {
      orderItem.quantity = changes.quantity;
    }
    return this.orderItemRepo.save(orderItem);
  }

  delete(id: number) {
    return this.orderItemRepo.delete(id);
  }
}
