import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateOrderItemDto } from '../dtos/order-item.dtos';
import { OrderItemService } from '../services/order-item.service';

@Controller('order-item')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}

  @Post('')
  create(@Body() payload: CreateOrderItemDto) {
    return this.orderItemService.create(payload);
  }

  @Get()
  getOrders() {
    return this.orderItemService.findAll();
  }

  @Get(':itemID')
  getOneItem(@Param('itemID', ParseIntPipe) itemID: number) {
    return this.orderItemService.findOne(itemID);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.orderItemService.delete(id);
  }
}
