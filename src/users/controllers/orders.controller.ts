import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { OrdersService } from '../services/orders.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateOrdersDto, UpdateOrdersDto } from '../dtos/order.dtos';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  getOrders() {
    return this.ordersService.findAll();
  }

  @Get('filtro')
  newFilter(): string {
    return 'Nuevo filtro';
  }

  @Get(':ordersID')
  @HttpCode(HttpStatus.ACCEPTED)
  getOneOrder(@Param('ordersID', ParseIntPipe) ordersID: number) {
    return this.ordersService.findOne(ordersID);
  }

  @Post()
  create(@Body() payload: CreateOrdersDto) {
    return this.ordersService.create(payload);
  }

  /*@Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateOrdersDto) {
    return this.ordersService.update(id, payload);
  }*/

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.ordersService.remove(id);
  }
}
