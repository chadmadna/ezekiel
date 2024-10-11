import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const shouldSynchronize = process.env.STAGE !== 'production';

const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5555,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  synchronize: shouldSynchronize,
  migrations: ['dist/migrations/*.js'],
};

export const typeormConfig = registerAs('typeorm', () => config);
const connectionSource = new DataSource(config as DataSourceOptions);
export default connectionSource;
