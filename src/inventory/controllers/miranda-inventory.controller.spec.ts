import { Test, TestingModule } from '@nestjs/testing';
import { MirandaInventoryController } from './miranda-inventory.controller';

describe('MirandaInventoryController', () => {
  let controller: MirandaInventoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MirandaInventoryController],
    }).compile();

    controller = module.get<MirandaInventoryController>(
      MirandaInventoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
