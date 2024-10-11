import { Module } from '@nestjs/common';
import { InventoriesService } from './inventory-items.service';
import { InventoriesController } from './inventory-items.controller';

@Module({
  controllers: [InventoriesController],
  providers: [InventoriesService],
})
export class InventoriesModule {}
