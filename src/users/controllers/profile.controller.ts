import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';
import { PayloadToken } from 'src/auth/models/token.model';
import { OrdersService } from '../services/orders.service';
import { UsersService } from '../services/user.services';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('profile')
@Controller('profile')
@Controller('profile')
export class ProfileController {
  constructor(
    private orderService: OrdersService,
    private userService: UsersService,
  ) {}

  @Get()
  getLoggedUser(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.userService.findOne(user.sub);
  }

  @Roles(Role.USER || Role.ADMIN)
  @Get('my-orders')
  getOrders(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.orderService.ordersByCustomer(user.sub);
  }
}
