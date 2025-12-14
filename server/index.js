import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import { apiLimiter, authLimiter, chatLimiter } from './config/rateLimiter.js';
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.use('/api/', apiLimiter);

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/chat', chatLimiter, chatRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
});

export default app;

