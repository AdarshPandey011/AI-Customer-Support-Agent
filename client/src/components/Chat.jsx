import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import api from '../utils/api'

const Chat = ({ onLogout }) => {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [typing, setTyping] = useState(false)
  const [currentChatId, setCurrentChatId] = useState(null)
  const [loadingChat, setLoadingChat] = useState(false)
  const messagesEndRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, typing])

  // Load chat if chatId is provided in location state
  useEffect(() => {
    const chatId = location.state?.chatId
    if (chatId) {
      loadChat(chatId)
    }
  }, [location.state])

  const loadChat = async (chatId) => {
    setLoadingChat(true)
    try {
      const response = await api.get(`/chat/${chatId}`)
      setCurrentChatId(response.data.id)
      setMessages(response.data.messages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })))
    } catch (error) {
      console.error('Error loading chat:', error)
      alert('Failed to load chat')
    } finally {
      setLoadingChat(false)
    }
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim() || loading) return

    const userMessage = inputMessage.trim()
    setInputMessage('')
    
    // Add user message immediately
    const newUserMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newUserMessage])
    setTyping(true)
    setLoading(true)

    try {
      const response = await api.post('/chat/send', {
        message: userMessage,
        chatId: currentChatId
      })

      setCurrentChatId(response.data.chatId)
      setMessages(response.data.messages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })))
    } catch (error) {
      console.error('Error sending message:', error)
      
      // Don't show error message if it's an auth error (will redirect)
      if (error.response?.status === 401) {
        return // Let the interceptor handle the redirect
      }
      
      const errorMessage = {
        role: 'assistant',
        content: error.response?.data?.error || 'Failed to get response. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setTyping(false)
      setLoading(false)
    }
  }

  const handleNewChat = () => {
    setMessages([])
    setCurrentChatId(null)
  }

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-indigo-600">ViralLens</h1>
              <span className="text-sm text-gray-500">AI Customer Support</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/history"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
              >
                Chat History
              </Link>
              <button
                onClick={handleNewChat}
                className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                New Chat
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {loadingChat && (
            <div className="text-center py-12">
              <div className="text-xl text-gray-600">Loading chat...</div>
            </div>
          )}
          {!loadingChat && messages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🤖</div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Welcome to ViralLens AI Support
              </h2>
              <p className="text-gray-500">
                Start a conversation by typing a message below
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3xl rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-800 shadow-sm border border-gray-200'
                }`}
              >
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start">
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSend} className="flex space-x-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chat

