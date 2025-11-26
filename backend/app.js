const express = require("express")
const cors = require('cors')
const connectDB = require('./src/config/db')
const authRoutes = require("./src/routes/auth.routes");
const reviewRoutes = require("./src/routes/review.routes")
const cookieParser = require('cookie-parser');
const chatRoutes = require("./src/routes/chat.routes")


const app = express()
app.use(cookieParser());
app.use(cors({
   origin: [
    "https://pixlemint.vercel.app",
    "http://localhost:5173"
  ], 
  credentials: true
}));

require("dotenv").config()
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/auth", authRoutes);
app.use('/code',reviewRoutes)
app.use('/chat', chatRoutes);


module.exports = app