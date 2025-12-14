import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  sendMessage,
  getChatHistory,
  getChatById,
  deleteChat
} from '../controllers/chatController.js';

const router = express.Router();

router.post('/send', authenticate, sendMessage);
router.get('/history', authenticate, getChatHistory);
router.get('/:chatId', authenticate, getChatById);
router.delete('/:chatId', authenticate, deleteChat);

export default router;

