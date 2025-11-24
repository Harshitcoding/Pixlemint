const express = require("express")
const cors = require('cors')
const connectDB = require('./src/config/db')
const authRoutes = require("./src/routes/auth.routes");
const reviewRoutes = require("./src/routes/review.routes")
const cookieParser = require('cookie-parser');
const app = express()

require("dotenv").config()
connectDB()

// CORS must come BEFORE other middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://pixlemint.vercel.app",
    "https://pixlemint-1azw.vercel.app"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

// Handle preflight requests explicitly
app.options('*', cors());

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!', status: 'OK' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.use("/auth", authRoutes);
app.use('/code', reviewRoutes)

// Catch-all 404 handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app