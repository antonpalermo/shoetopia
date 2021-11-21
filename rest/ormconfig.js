module.exports = {
  type: 'postgres',
  host: process.env.APP_DB_HOST,
  port: process.env.APP_DB_PORT,
  synchronize: true,
  logging: true,
  database: process.env.APP_DB_NAME,
  username: process.env.APP_DB_USERNAME,
  password: process.env.APP_DB_PASSWORD,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
}
