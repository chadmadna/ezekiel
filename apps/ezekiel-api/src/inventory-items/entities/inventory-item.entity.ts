import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { PlayerEntity } from '../../players/entities/player.entity';

@Entity('inventory_items')
export class InventoryItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @ManyToOne(() => PlayerEntity, (player) => player.items)
  player: PlayerEntity;
}
