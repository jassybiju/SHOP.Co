import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connection successful");
    } catch (error) {
        console.log(error);
        console.log(`Error in mongo connection`);
    }
};