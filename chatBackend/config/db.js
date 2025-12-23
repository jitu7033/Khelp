import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("mongo db coneected");
    }
    catch (error) {
        console.log("error : ", error);
        process.exit(1);
    }
}