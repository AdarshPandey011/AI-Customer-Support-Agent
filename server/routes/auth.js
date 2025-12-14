import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  signup,
  login,
  getCurrentUser,
  logout
} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', authenticate, getCurrentUser);
router.post('/logout', authenticate, logout);

export default router;

