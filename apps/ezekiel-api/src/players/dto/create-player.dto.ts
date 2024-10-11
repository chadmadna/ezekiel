import { CreateInventoryItemDto } from '../../inventory-items/dto/create-inventory-item.dto';

export class CreatePlayerDto {
  playerName: string;
  characterName: string;
  items: CreateInventoryItemDto[];
}
