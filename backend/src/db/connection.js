import { Sequelize } from 'sequelize';

const user = 'm_admin';
const host = 'localhost';
const database = 'm_db';
const password = 'm_12345678';
const port = '5432';
const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'postgres',
    logging: false
});

export default sequelize;