import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as dotenv from 'dotenv'

dotenv.config()

const commonConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5432,
  synchronize: true,
  ssl: process.env.NODE_ENV === 'production',
}

const localConfig: TypeOrmModuleOptions = {
  ...commonConfig,
  host: `${process.env.DB_HOST}`,
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
}

const prodConfig: TypeOrmModuleOptions = {
  ...commonConfig,
  host: `${process.env.DB_PROD_HOST}`,
  username: `${process.env.DB_PROD_USERNAME}`,
  password: `${process.env.DB_PROD_PASSWORD}`,
  database: `${process.env.DB_PROD_NAME}`,
  entities: ['dist/**/*.entity.{js,ts}'],
}

export const ormConfig =
  process.env.NODE_ENV === 'development' ? localConfig : prodConfig
