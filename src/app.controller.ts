import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

import { ApiKeyGuard } from './auth/guards/api-key.guard';
import { Public } from './auth/decorators/public.decorator';

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nuevo')
  @Public()
  newEndpoint(): string {
    return 'Nuevo endpoint';
  }
  @Get('/root/')
  @Public()
  getRoot(): string {
    return 'Nuevo root';
  }
  @Get('/vehicle')
  vehicle() {
    return this.appService.getVehicles();
  }
}
