module.exports = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/infra/database/pg/entities/*.js'],
  migrations: ['dist/infra/database/pg/migrations/*.js'],
  cli: {
    migrationsDir: 'src/infra/database/pg/migrations',
  },
};
