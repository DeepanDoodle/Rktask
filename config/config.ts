import * as dotenv from 'dotenv';
import { Options, Sequelize } from 'sequelize';
dotenv.config();

const config: Options = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || '',
  host: process.env.DB_HOST || '',
  dialect: 'mysql'
};

export const sequelize = new Sequelize(config);
