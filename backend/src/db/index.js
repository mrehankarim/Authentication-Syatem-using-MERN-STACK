import { DB_NAME } from "../constant.js";
import mongoose from "mongoose"
const connectDB= async ()=>{

    try {
        console.log(process.env.MONGODB_URI)
        
        const mongodbInstance=await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        );
        console.log("MongoDB connected!! Host:,", mongodbInstance.connection.host);
    } catch (error) {
        console.log("DB connection failed",error)
        process.exit(1)
        
    }

}

export default connectDB;