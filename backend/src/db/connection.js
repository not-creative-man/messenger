import { Sequelize } from 'sequelize';

const user = process.env.DB_USER || 'm_admin';
const host = process.env.DB_HOST || 'localhost';
const database = process.env.DB_NAME || 'm_db';
const password = process.env.DB_PASSWORD || 'm_12345678';
const port = process.env.DB_PORT || '5432';

const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'postgres',
    logging: false
});

export default sequelize;