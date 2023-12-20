import * as mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        await mongoose.connect(<string>process.env.MONGODB_URI);

        console.log('MongoDB connected')
    }catch (e) {
        console.error(e)
        process.exit(1)
    }
}