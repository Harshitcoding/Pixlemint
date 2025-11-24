const express = require("express")
const cors = require('cors')
const connectDB = require('./src/config/db')
const authRoutes = require("./src/routes/auth.routes");
const reviewRoutes = require("./src/routes/review.routes")
const cookieParser = require('cookie-parser');
require("dotenv").config()

const app = express()
app.use(cookieParser());

// Configure allowed origins. Add your deployed frontend URL to the FRONTEND_URL env var
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'https://pixlemint.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS policy: This origin is not allowed'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With']
};

app.use(cors(corsOptions));
// Enable preflight across the board to avoid 404 on OPTIONS requests
app.options('*', cors(corsOptions));
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/auth", authRoutes);
app.use('/code',reviewRoutes)

module.exports = app