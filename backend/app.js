const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/auth.routes");
const reviewRoutes = require("./src/routes/review.routes");
require("dotenv").config();

const app = express();

// JSON + URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// CORS - before routes
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://pixlemint.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

// Preflight handler
app.options('*', cors());

// Connect DB
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/code", reviewRoutes);

module.exports = app;
