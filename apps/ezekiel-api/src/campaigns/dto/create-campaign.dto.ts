import { CreatePlayerDto } from '../../players/dto/create-player.dto';

export class CreateCampaignDto {
  name: string;
  details?: string;
  isActive: boolean;
  players: CreatePlayerDto[];
}
