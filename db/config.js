import mongoose from "mongoose";

export const connectToDb = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CONN);
        console.log('connected to db');
    } catch (error) {
        console.log(error);
        throw new Error('error connecting to db');
    }
};