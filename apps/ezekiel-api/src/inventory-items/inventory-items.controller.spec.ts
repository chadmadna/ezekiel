import { Test, TestingModule } from '@nestjs/testing';
import { InventoriesController } from './inventory-items.controller';
import { InventoriesService } from './inventory-items.service';

describe('InventoriesController', () => {
  let controller: InventoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoriesController],
      providers: [InventoriesService],
    }).compile();

    controller = module.get<InventoriesController>(InventoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
