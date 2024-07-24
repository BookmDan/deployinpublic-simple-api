import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'postgres',
  synchronize: false,
  logging: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  ssl: process.env.ENVIRONMENT === 'production',
  extra: process.env.ENVIRONMENT === 'production' ? { ssl: { rejectUnauthorized: false } } : {},
});

export default dataSource;
