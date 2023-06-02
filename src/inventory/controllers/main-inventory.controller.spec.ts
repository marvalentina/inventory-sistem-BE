import { Test, TestingModule } from '@nestjs/testing';
import { MainInventoryController } from './main-inventory.controller';

describe('MainInventoryController', () => {
  let controller: MainInventoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainInventoryController],
    }).compile();

    controller = module.get<MainInventoryController>(MainInventoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
