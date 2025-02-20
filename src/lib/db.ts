import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI ?? "";

export const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ Database connection error:", error);
    }
};

// export const connectDB = async () => {
//     if (mongoose.connection.readyState === 1) {
//         console.log("✅ Using existing database connection");
//         return;
//     }
//     try {
//         await mongoose.disconnect(); // Close previous connections
//         await mongoose.connect(process.env.MONGO_URI!);
//         console.log("✅ MongoDB connected");
//     } catch (error) {
//         console.error("❌ Database connection error:", error);
//     }
// }