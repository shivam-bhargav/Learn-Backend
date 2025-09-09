// require("dotenv").config({path:"./env"});
import dotenv from "dotenv";
import connectDB from "./db/index.db.js";
import express from "express";
const app = express();

dotenv.config({path:"./env"})
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("MONGO db connection failed !!!", error);
})


























/*
import mongoose from "mongoose";
import { DB_NAME } from "./contants";

(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("Errr: ", error);
            throw error;
        });
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log("Error: ",error);
        throw error;
    }
})();*/