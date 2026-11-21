const mongoose = require("mongoose")

const connectDB = async () => {
    if (!process.env.MONGO_URL) {
        throw new Error("MONGO_URL is not configured")
    }

    await mongoose.connect(process.env.MONGO_URL, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000
    })
    console.log("Database connected")
}

module.exports = connectDB