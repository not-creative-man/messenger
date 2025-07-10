import UserModel from "../models/UserModel.js";
import Logger from "../utils/Logger.js";
import { Op } from "sequelize";

class UserRepository {
    async findByLogin(login) {
        Logger.log("UserRepository", "findByLogin", true, login);
        const findData = await UserModel.findAll({
            where: {
                login: login
            }
        });
        Logger.log("UserRepository", "findByLogin", false, findData);
        return findData[0];
    }

    async findById(id) {
        Logger.log("UserRepository", "findById", true, id);
        const findData = await UserModel.findAll({
            attributes: ['id', 'login', 'email', 'name', 'avatar_url', 'birth'],
            where: {
                id: id
            }
        });
        Logger.log("UserRepository", "findById", false, findData);
        return findData[0];
    }

    async createUser(user) {
        Logger.log("UserRepository", "createUser", true, user);
        const result = await UserModel.create(user);
        Logger.log("UserRepository", "createUser", false, result);
        return result.id;
    }

    async loginUser(user) {
        Logger.log("UserRepository", "loginUser", true, user);
        const result = await UserModel.findAll({
            where: {
                login: user.login,
                password_hash: user.password_hash
            }
        });
        Logger.log("UserRepository", "loginUser", false, result);
        return result[0];
    }

    async getAllUsers() {
        Logger.log("UserRepository", "getAllUsers", true);
        const rows = await UserModel.findAll({})
        Logger.log("UserRepository", "getAllUsers", false, rows);
        return rows;
    }

    async findByName(name) {
        Logger.log("UserRepository", "findByName", true, name);
        const rows = await UserModel.findAll({
            where: {
                name: {
                    [Op.like]: name,
                }
            },
            order: [
                ['name', 'ASC']
            ]
        });
        Logger.log("UserRepository", "findByName", false, rows);
        return rows;
    }
}

export default new UserRepository();