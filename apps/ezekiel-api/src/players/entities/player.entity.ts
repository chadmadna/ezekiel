import { CampaignEntity } from '../../campaigns/entities/campaign.entity';
import { InventoryItemEntity } from '../../inventory-items/entities/inventory-item.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';

@Entity('players')
export class PlayerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  playerName: string;

  @Column()
  characterName: string;

  @ManyToOne(() => CampaignEntity, (campaign) => campaign.players)
  campaign: CampaignEntity;

  @OneToOne(() => InventoryItemEntity, (item) => item.player, {
    eager: true,
    cascade: true,
  })
  items: InventoryItemEntity[];
}
