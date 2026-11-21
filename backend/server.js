require("dotenv").config();
const app = require('./app');
const connectDB = require('./src/config/db');
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    app.listen(PORT, () => console.log("Server running on port " + PORT));

    connectDB().catch((error) => {
        console.error("Database connection failed:", error.message);
    });
};

startServer();