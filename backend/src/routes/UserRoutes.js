import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/getAllUsers", UserController.getAllUsers);
router.get("/findUsers", UserController.findUsers);
router.get("/findUserById", UserController.findUserById);

export default router;