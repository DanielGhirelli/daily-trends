// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import feedRoutes from './routes/feedRoutes';
import { connectDB } from './config/db';
import { errorHandler } from './middleware/errorHandler';

dotenv.config(); // Load .env variables before anything else

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

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
