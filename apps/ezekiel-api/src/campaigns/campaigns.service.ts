import { Injectable } from '@nestjs/common';
import { CampaignEntity } from './entities/campaign.entity';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { PlayerEntity } from '../players/entities/player.entity';
import { InventoryItemEntity } from '../inventory-items/entities/inventory-item.entity';
import { handleDBErr } from '../shared/database';

@Injectable()
export class CampaignsService {
  async create(createCampaignDto: CreateCampaignDto) {
    const newCampaign = new CampaignEntity();
    newCampaign.name = createCampaignDto.name;
    newCampaign.details = createCampaignDto.details;
    newCampaign.isActive = createCampaignDto.isActive;
    newCampaign.players = await Promise.all(
      createCampaignDto.players.map((player) => {
        const newPlayer = new PlayerEntity();
        newPlayer.playerName = player.playerName;
        newPlayer.characterName = player.characterName;
        newPlayer.items = [];
        return newPlayer.save();
      }),
    );

    try {
      await newCampaign.save();
    } catch (err) {
      handleDBErr(err);
    }

    return newCampaign;
  }

  async findAll() {
    let campaigns: CampaignEntity[] = [];
    try {
      campaigns = await CampaignEntity.find();
    } catch (err) {
      handleDBErr(err);
    }

    campaigns = campaigns.map((campaign) => this.getSharedInventory(campaign));

    return campaigns;
  }

  async findOne(id: number) {
    let campaign: CampaignEntity;
    try {
      campaign = await CampaignEntity.findOneBy({ id: id });
    } catch (err) {
      handleDBErr(err);
    }

    campaign = this.getSharedInventory(campaign);

    return campaign;
  }

  async update(id: number, updateCampaignDto: UpdateCampaignDto) {
    const campaign = await CampaignEntity.findOneBy({ id: id });
    campaign.name = updateCampaignDto.name;
    campaign.details = updateCampaignDto.details;
    campaign.isActive = updateCampaignDto.isActive;
    campaign.players = await Promise.all(
      updateCampaignDto.players.map(async (player) => {
        const newPlayer = new PlayerEntity();
        newPlayer.playerName = player.playerName;
        newPlayer.characterName = player.characterName;
        newPlayer.items = await Promise.all(
          player.items.map(async (item) => {
            const newItem = new InventoryItemEntity();
            newItem.name = item.name;
            newItem.quantity = item.quantity;

            return newItem.save();
          }),
        );
        return newPlayer.save();
      }),
    );

    try {
      await campaign.save();
    } catch (err) {
      handleDBErr(err);
    }

    return campaign;
  }

  async remove(id: number) {
    let campaign: CampaignEntity;
    try {
      campaign = await CampaignEntity.findOneBy({ id: id });
      campaign = await campaign.remove();
    } catch (err) {
      handleDBErr(err);
    }

    return campaign;
  }

  private getSharedInventory(campaign: CampaignEntity) {
    campaign.sharedInventory = campaign.players
      .flatMap((player) => player.items)
      .filter((item) => item != null)
      .reduce((prevItems, currentItem) => {
        const existingItem = prevItems.find(
          (item) => item.name === currentItem.name,
        );
        if (!existingItem) {
          delete currentItem.id;
          prevItems.push(currentItem);
        } else {
          existingItem.quantity += currentItem.quantity;
        }
        return prevItems;
      }, []);

    return campaign;
  }
}
