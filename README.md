# ViralLens - AI Customer Support Agent

A full-stack AI-powered customer support chat application built with React, Node.js, Express, MongoDB, and Hugging Face AI.

## 🚀 Features

- **Authentication System**
  - User signup/login with JWT tokens
  - Password hashing with bcrypt
  - Protected routes and API endpoints

- **AI Chat System**
  - Real-time chat interface
  - AI-powered responses using Hugging Face Inference API
  - Chat history persistence
  - User-scoped conversations

- **User Interface**
  - Modern, responsive design with Tailwind CSS
  - Typing indicators
  - Chat history management
  - Smooth user experience

- **Production Ready**
  - Docker containerization
  - Rate limiting
  - Error handling
  - Environment configuration

## 📦 Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt
- **AI Integration**: Hugging Face Inference API
- **DevOps**: Docker + Docker Compose

## 🛠️ Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose (for containerized setup)
- MongoDB Atlas account (or use local MongoDB)
- Hugging Face API key ([Get one here](https://huggingface.co/settings/tokens))

## 📋 Setup Instructions

### Option 1: Docker Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd virallens
   ```

2. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   JWT_SECRET=your-super-secret-jwt-key-change-this
   HUGGING_FACE_API_KEY=your-hugging-face-api-key
   HUGGING_FACE_MODEL=microsoft/DialoGPT-medium
   ```

3. **Start the application**
   ```bash
   docker-compose up --build
   ```

   The application will be available at:
   - Frontend: http://localhost
   - Backend API: http://localhost:5000

### Option 2: Local Development Setup

#### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/virallens
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   HUGGING_FACE_API_KEY=your-hugging-face-api-key
   HUGGING_FACE_MODEL=microsoft/DialoGPT-medium
   CLIENT_URL=http://localhost:5173
   ```

4. **Start MongoDB** (if using local MongoDB)
   ```bash
   mongod
   ```

5. **Start the server**
   ```bash
   npm run dev
   ```

#### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** (optional, defaults to localhost:5000)
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The frontend will be available at http://localhost:5173

## 🔑 Getting Hugging Face API Key

1. Go to [Hugging Face](https://huggingface.co/)
2. Sign up or log in
3. Navigate to [Settings > Tokens](https://huggingface.co/settings/tokens)
4. Create a new token with "Read" permissions
5. Copy the token and add it to your `.env` file

## 📁 Project Structure

```
virallens/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── utils/         # Utility functions
│   │   └── App.jsx        # Main app component
│   ├── Dockerfile
│   └── package.json
├── server/                 # Express backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   ├── services/          # AI service
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml     # Docker configuration
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Chat
- `POST /api/chat/send` - Send message and get AI response
- `GET /api/chat/history` - Get user's chat history
- `GET /api/chat/:chatId` - Get specific chat
- `DELETE /api/chat/:chatId` - Delete chat

## 🎯 Usage

1. **Sign Up**: Create a new account with username, email, and password
2. **Login**: Sign in with your credentials
3. **Start Chatting**: Type messages and get AI-powered responses
4. **View History**: Access your past conversations
5. **New Chat**: Start a fresh conversation anytime

## 🐳 Docker Commands

```bash
# Build and start all services
docker-compose up --build

# Start in detached mode
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild specific service
docker-compose build server
docker-compose up server
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Rate limiting on API endpoints
- CORS configuration
- Input validation
- Protected routes

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running (local) or connection string is correct (Atlas)
- Check firewall settings for MongoDB Atlas

### Hugging Face API Errors
- Verify API key is correct
- Check rate limits on your Hugging Face account
- Some models may take time to load (503 error) - wait and retry

### CORS Errors
- Ensure `CLIENT_URL` in server `.env` matches your frontend URL
- Check that CORS middleware is properly configured

## 📝 Environment Variables

### Server (.env)
```
PORT=5000
NODE_ENV=development|production
MONGODB_URI=mongodb://...
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
HUGGING_FACE_API_KEY=your-api-key
HUGGING_FACE_MODEL=microsoft/DialoGPT-medium
CLIENT_URL=http://localhost:5173
```

### Client (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built as a full-stack challenge project demonstrating modern web development practices.

---

**Note**: Make sure to change the `JWT_SECRET` in production and keep your API keys secure!

