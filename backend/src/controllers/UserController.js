import UserService from '../services/UserService.js';
import Logger from "../utils/Logger.js";

class UserController {
    async register(req, res) {
        try{
            Logger.log("UserController", "register", true, req.body);
            const user = await UserService.registerUser(req.body);
            res.status(201).json(user);
        } catch(error){
            res.status(400).json({error: error.message});
        }
    }

    async login(req, res) {
        try{
            Logger.log("UserController", "login", true, req.body);
            const user = await UserService.loginUser(req.body);
            res.status(200).json(user);
        } catch(error){
            res.status(400).json({error: error.message});
        }
    }

    async getAllUsers(req,res){
        try{
            Logger.log("UserController", "getAllUsers", true);
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error){
            res.status(400).json({error: error.message});
        }
    }

    async findUsers(req,res){
        try{
            Logger.log("UserController", "findUsers", true, req.query);
            const users = await UserService.findUsers(req.query);
            res.status(200).json(users);
        } catch(error){
            res.status(400).json({error: error.message});
        }

    }
}

export default new UserController();