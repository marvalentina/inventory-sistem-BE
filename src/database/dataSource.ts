import { DataSource } from 'typeorm';
import 'dotenv/config';

export const connectionSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  entities: ['src/**/*.entity.ts'],
  ssl: {
    rejectUnauthorized: false,
  },
});
