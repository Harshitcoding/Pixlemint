const express = require("express")
const cors = require('cors')
const connectDB = require('./src/config/db')
const authRoutes = require("./src/routes/auth.routes");
const reviewRoutes = require("./src/routes/review.routes")
const cookieParser = require('cookie-parser');
const app = express()
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",  // tumhari Vite frontend URL
  credentials: true
}));

require("dotenv").config()
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/auth", authRoutes);
app.use('/code',reviewRoutes)

module.exports = app