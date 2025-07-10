import UserRepository from '../repositories/UserRepository.js';
import Hasher from "../utils/HashData.js";
import Logger from "../utils/Logger.js";

class UserService {
    async registerUser(userData){
        Logger.log("UserService", "registerUser", true, userData);
        try{
            const existingUser = await UserRepository.findByLogin(userData.login);
            if (existingUser) {
                throw new Error('User already exists');
            }
        } catch (e){
            console.error(e);
            throw new Error(e);
        }

        userData.password_hash = Hasher.hashing(userData.password);
        userData.created_at = new Date();
        userData.updated_at = new Date();
        const userId = await UserRepository.createUser(userData);

        Logger.log("UserService", "registerUser", false, userId);
        return {
            userId
        };
    }

    async loginUser(userData){
        Logger.log("UserService", "loginUser", true, userData);
        userData.password_hash = Hasher.hashing(userData.password);
        const existingUser = await UserRepository.loginUser(userData);

        if (!existingUser) {
            throw new Error('User not found');
        }
        Logger.log("UserService", "loginUser", false, existingUser);
        return existingUser.id;
    }

    async getAllUsers(){
        Logger.log("UserService", "getAllUsers", true);
        const users = await UserRepository.getAllUsers();
        Logger.log("UserService", "getAllUsers", false, users);
        return users;
    }

    async findUsers(userData){
        Logger.log("UserService", "findUsers", true, userData);
        const users = await UserRepository.findByName('%' + userData.name + '%');
        Logger.log("UserService", "findUsers", false, users);
        return users;
    }

    async findUserById(userData){
        Logger.log("UserService", "findUserById", true, userData);
        const users = await UserRepository.findById(userData.id);
        Logger.log("UserService", "findUserById", false, users);
        return users;
    }
}

export default new UserService();