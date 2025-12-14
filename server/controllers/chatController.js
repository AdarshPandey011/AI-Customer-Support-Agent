import Chat from '../models/Chat.js';
import aiService from '../services/aiService.js';

export const sendMessage = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { message, chatId } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    let chat;
    
    if (chatId) {
      chat = await Chat.findOne({ _id: chatId, user: req.user._id });
      if (!chat) {
        return res.status(404).json({ error: 'Chat not found' });
      }
    } else {
      chat = new Chat({
        user: req.user._id,
        messages: [],
        title: message.substring(0, 50)
      });
    }

    chat.messages.push({
      role: 'user',
      content: message.trim()
    });

    const recentMessages = chat.messages.slice(-10).map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    let aiResponse;
    try {
      aiResponse = await aiService.generateResponse(message, recentMessages);
    } catch (error) {
      console.error('AI generation error:', error);
      aiResponse = error.message || "I'm having trouble processing that right now. Please try again.";
    }

    chat.messages.push({
      role: 'assistant',
      content: aiResponse
    });

    await chat.save();

    res.json({
      chatId: chat._id,
      userMessage: message,
      aiResponse: aiResponse,
      messages: chat.messages
    });
  } catch (error) {
    console.error('Chat send error:', error);
    res.status(500).json({ error: 'Server error while processing chat' });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id })
      .select('title messages createdAt updatedAt')
      .sort({ updatedAt: -1 })
      .limit(50);

    const formattedChats = chats.map(chat => ({
      id: chat._id,
      title: chat.title,
      messageCount: chat.messages.length,
      lastMessage: chat.messages[chat.messages.length - 1]?.content || '',
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt
    }));

    res.json({ chats: formattedChats });
  } catch (error) {
    console.error('Chat history error:', error);
    res.status(500).json({ error: 'Server error while fetching chat history' });
  }
};

export const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.chatId,
      user: req.user._id
    });

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    res.json({
      id: chat._id,
      title: chat.title,
      messages: chat.messages,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt
    });
  } catch (error) {
    console.error('Get chat error:', error);
    res.status(500).json({ error: 'Server error while fetching chat' });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({
      _id: req.params.chatId,
      user: req.user._id
    });

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    res.json({ message: 'Chat deleted successfully' });
  } catch (error) {
    console.error('Delete chat error:', error);
    res.status(500).json({ error: 'Server error while deleting chat' });
  }
};

