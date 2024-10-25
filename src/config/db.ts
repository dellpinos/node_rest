import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL_CONNECTION!, {
    models: [__dirname + '/../models/**/*'],
    logging: false
});

export default db;
