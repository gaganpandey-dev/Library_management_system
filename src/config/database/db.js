import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(
    `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
);

        console.log(`✅ MongoDB Connected : ${connection.connection.host}`);

    } catch (error) {
        console.error("❌ MongoDB Connection Failed");
        console.error(error.message);

        // Every major feature depends on the database.
        // If the database is unavailable, stop the application.
        process.exit(1);
    }
};

export default connectDB;