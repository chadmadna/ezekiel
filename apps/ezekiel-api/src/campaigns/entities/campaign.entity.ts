import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeUpdate,
} from 'typeorm';

import { PlayerEntity } from '../../players/entities/player.entity';
import { InventoryItemEntity } from '../../inventory-items/entities/inventory-item.entity';

@Entity('campaigns')
export class CampaignEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  details: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated = new Date();
  }

  @OneToMany(() => PlayerEntity, (player) => player.campaign, {
    eager: true,
    cascade: true,
  })
  players: PlayerEntity[];

  sharedInventory?: InventoryItemEntity[];
}
