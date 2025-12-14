import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const HUGGING_FACE_ROUTER_URL = 'https://router.huggingface.co/v1/chat/completions';
const DEFAULT_MODEL = process.env.HUGGING_FACE_MODEL || 'meta-llama/Llama-3.1-8B-Instruct';

class AIService {
  constructor() {
    this.apiKey = process.env.HUGGING_FACE_API_KEY;
    this.model = process.env.HUGGING_FACE_MODEL || DEFAULT_MODEL;
    
    if (!this.apiKey) {
      console.warn('⚠️  HUGGING_FACE_API_KEY not found in environment variables');
    } else {
      console.log(`✅ AI Service initialized with model: ${this.model}`);
    }
  }

  async generateResponse(userMessage, conversationHistory = []) {
    try {
      if (!this.apiKey) {
        throw new Error('Hugging Face API key not configured');
      }

      let messages = [];
      
      messages.push({
        role: 'system',
        content: 'You are a helpful customer support assistant. Be friendly, concise, and helpful.'
      });
      
      if (conversationHistory.length > 0) {
        const recentHistory = conversationHistory.slice(-10);
        for (const msg of recentHistory) {
          messages.push({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.content
          });
        }
      }
      
      messages.push({
        role: 'user',
        content: userMessage
      });
      let response;
      let retries = 3;
      let lastError = null;
      
      while (retries >= 0) {
        try {
          const requestData = {
            model: this.model,
            messages: messages,
            max_tokens: 200,
            temperature: 0.7,
            top_p: 0.9
          };

          console.log(`📤 Calling Hugging Face Router API with model: ${this.model}`);
          response = await axios.post(
            HUGGING_FACE_ROUTER_URL,
            requestData,
            {
              headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
              },
              timeout: 45000
            }
          );
          
          if (!response.data) {
            throw new Error('Empty response from API');
          }
          
          if (response.data.error) {
            throw new Error(response.data.error);
          }
          
          console.log(`✅ Successfully received response from Hugging Face API`);
          break;
        } catch (error) {
          lastError = error;
          console.error(`AI API attempt failed (${retries} retries left):`, {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            message: error.message
          });
          
          if (error.response?.status === 503 && retries > 0) {
            const waitTime = 15000;
            console.log(`Model loading, waiting ${waitTime/1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
            retries--;
          } else if (error.response?.status === 429 && retries > 0) {
            const waitTime = 20000;
            console.log(`Rate limited, waiting ${waitTime/1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
            retries--;
          } else if (retries > 0) {
            const waitTime = 5000;
            console.log(`Error occurred, waiting ${waitTime/1000} seconds before retry...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
            retries--;
          } else {
            throw error;
          }
        }
      }
      
      if (!response) {
        throw lastError || new Error('Failed to get response after all retries');
      }

      let aiResponse = '';
      
      if (response.data.choices && response.data.choices.length > 0) {
        const choice = response.data.choices[0];
        if (choice.message && choice.message.content) {
          aiResponse = choice.message.content.trim();
        }
      }
      
      if (!aiResponse && response.data.content) {
        aiResponse = response.data.content.trim();
      }
      
      if (aiResponse) {
        aiResponse = aiResponse.trim();
      }

      if (!aiResponse || aiResponse.length < 3) {
        console.warn('AI response too short or empty, using intelligent fallback');
        aiResponse = this.getFallbackResponse(userMessage);
      }

      return aiResponse;
    } catch (error) {
      console.error('AI Service Error Details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        code: error.code
      });
      
      if (error.response?.status === 503) {
        return 'The AI model is currently loading. Please wait a moment and try again.';
      }
      
      if (error.response?.status === 429) {
        return 'Rate limit exceeded. Please wait a moment before sending another message.';
      }

      if (error.response?.status === 401) {
        return 'Authentication failed with AI service. Please check API configuration.';
      }

      if (error.code === 'ECONNABORTED') {
        return 'Request timeout. The AI service took too long to respond. Please try again.';
      }

      if (error.message?.includes('API key')) {
        return 'AI service configuration error. Please contact support.';
      }

      if (error.message === 'API_ENDPOINT_DEPRECATED' || error.response?.status === 410 || error.response?.status === 404) {
        console.warn('⚠️  Hugging Face API endpoint issue (Status:', error.response?.status || 'N/A', ')');
        console.warn('📝 Using intelligent fallback system. The API may be temporarily unavailable.');
        return this.getFallbackResponse(userMessage);
      }

      console.error('❌ AI Service Error - Using fallback:', {
        message: error.message,
        status: error.response?.status,
        code: error.code
      });
      return this.getFallbackResponse(userMessage);
    }
  }

  getFallbackResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    if (message.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/)) {
      return "Hello! How can I help you today?";
    }
    
    if (message.match(/how are you|how's it going|how do you do/)) {
      return "I'm doing well, thank you for asking! How can I assist you?";
    }
    
    if (message.match(/what.*your name|who are you|what are you/)) {
      return "I'm ViralLens AI Assistant, your customer support agent. How can I help you today?";
    }
    
    if (message.match(/prime minister|president|leader|head of state/)) {
      const country = message.match(/(?:of|in)\s+(\w+)/)?.[1] || 'that country';
      return `I'd be happy to help you find information about the prime minister of ${country}. However, I'm currently using a fallback system. For accurate, up-to-date information, please check official government websites or news sources.`;
    }
    
    if (message.match(/what.*up|what's up|sup|wassup/)) {
      return "Not much! Just here to help you. What can I do for you today?";
    }
    
    if (message.match(/^(what|who|where|when|why|how)/)) {
      if (message.match(/what is|what's/)) {
        return "That's a great question! Could you provide a bit more context? I'm here to help with customer support and general inquiries.";
      }
      if (message.match(/who is|who's/)) {
        return "I'd be happy to help you find information about that person. Could you provide more details about what you're looking for?";
      }
      return "That's an interesting question. Could you provide a bit more context so I can help you better?";
    }
    
    if (message.match(/why.*error|why.*not working|why.*problem|why.*issue/)) {
      return "I understand your concern. The AI service is currently using a fallback system because the Hugging Face API endpoints are temporarily unavailable. I'm still here to help though! What do you need assistance with?";
    }
    
    if (message.match(/^(yes|yeah|yep|no|nope|sure|ok|okay)/)) {
      return "I understand. Is there anything else I can help you with?";
    }
    
    if (message.match(/thank|thanks|appreciate/)) {
      return "You're welcome! Is there anything else I can help you with?";
    }
    
    if (message.match(/bye|goodbye|see you|farewell/)) {
      return "Goodbye! Have a great day!";
    }
    const responses = [
      "I understand. Could you tell me more about that?",
      "That's interesting. Can you provide more details?",
      "I see. How can I help you with that?",
      "Got it. What would you like to know more about?",
      "I'm here to help. Could you elaborate on that?"
    ];
    
    const index = message.length % responses.length;
    return responses[index];
  }
}

export default new AIService();


