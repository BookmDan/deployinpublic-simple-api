module.exports = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'postgres',
    logging: true,
    synchronize: process.env.ENVIRONMENT !== 'production',
    ssl: process.env.ENVIRONMENT === 'production',
    extra: process.env.ENVIRONMENT === 'production' ? { ssl: { rejectUnauthorized: false } } : null,
    entities: [__dirname + '/../**/**.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  };