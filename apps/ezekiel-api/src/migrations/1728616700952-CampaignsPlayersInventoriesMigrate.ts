import { MigrationInterface, QueryRunner } from 'typeorm';

export class CampaignsPlayersInventoriesMigrate1728616700952
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			CREATE TABLE campaigns (
				id BIGSERIAL PRIMARY KEY,
				name VARCHAR(255),
				details TEXT,
				is_active BOOLEAN,
				created TIMESTAMP,
				updated TIMESTAMP
			);

			CREATE UNIQUE INDEX campaigns_name_idx ON campaigns(name);

			CREATE TABLE players (
				id BIGSERIAL PRIMARY KEY,
				campaign_id INTEGER REFERENCES campaigns,
				player_name VARCHAR(255),
				character_name VARCHAR(255),
				created TIMESTAMP,
				updated TIMESTAMP
			);

			CREATE UNIQUE INDEX players_name_idx ON players(player_name, character_name);

			CREATE TABLE inventory_items (
				id BIGSERIAL PRIMARY KEY,
				player_id INTEGER REFERENCES players,
				name VARCHAR(255),
				quantity INTEGER
			);

			CREATE UNIQUE INDEX inventory_item_player_id_name_idx ON inventory_items(player_id, name);
		`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			DROP TABLE IF EXISTS inventory_items CASCADE,
			DROP TABLE IF EXISTS players CASCADE,
			DROP TABLE IF EXISTS campaigns CASCADE,
		`);
  }
}
