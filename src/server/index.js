import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.js';
import { apiLimiter } from './middleware/rateLimiter.js';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());
app.use(apiLimiter);

// Routes
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});