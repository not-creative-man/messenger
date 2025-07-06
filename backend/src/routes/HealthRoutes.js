import express from "express";
import Logger from "../utils/Logger.js";

const router = express.Router();
router.get("/", (req,res) => {
    try{
        Logger.log("none", "health", true);
        res.status(200).json("It works!");
    } catch(error){
        res.status(400).json({error: error.message});
    }

});

export default router;