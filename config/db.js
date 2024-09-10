import mongoose from "mongoose";
import "dotenv/config"

export const connectDB= async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log('Database connected Successfully')
    } catch (error) {
        console.log("Failed to connect to database", error.message)
        process.exit(1)
        
    }
};