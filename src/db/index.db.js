import mongoose from "mongoose";
import { DB_NAME } from "../contants.js";

const connectDB = async (error) =>{
    try {
        // console.log("LELELEL ",DB_NAME);
        const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Error: ",error);
        process.exit(1);
    }
}

export default connectDB;