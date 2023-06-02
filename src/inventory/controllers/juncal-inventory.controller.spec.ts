import { Test, TestingModule } from '@nestjs/testing';
import { JuncalInventoryController } from './juncal-inventory.controller';

describe('JuncalInventoryController', () => {
  let controller: JuncalInventoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JuncalInventoryController],
    }).compile();

    controller = module.get<JuncalInventoryController>(JuncalInventoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
