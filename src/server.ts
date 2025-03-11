// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import hpp from 'hpp';

import feedRoutes from './routes/feedRoutes';
import { connectDB } from './config/db';
import { errorHandler } from './middleware/errorHandler';

dotenv.config(); // Load .env variables before anything else

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Security Middlewares
app.use(helmet()); // Protects against common vulnerabilities
app.use(cors()); // Allows cross-origin requests
app.use(hpp()); // Prevents Parameter Pollution

// Rate Limiting: Limit repeated requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per 15 minutes
  message: 'Too many requests, please try again later.',
});
app.use(limiter);

// Routes
app.use('/feeds', feedRoutes);

// Error handling middleware (must be after routes)
app.use(errorHandler);

// Start server after connecting to database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
