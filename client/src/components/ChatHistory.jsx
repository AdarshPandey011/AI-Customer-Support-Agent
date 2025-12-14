import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../utils/api'

const ChatHistory = ({ onLogout }) => {
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchChatHistory()
  }, [])

  const fetchChatHistory = async () => {
    try {
      const response = await api.get('/chat/history')
      setChats(response.data.chats)
    } catch (error) {
      console.error('Error fetching chat history:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (chatId) => {
    if (!window.confirm('Are you sure you want to delete this chat?')) return

    try {
      await api.delete(`/chat/${chatId}`)
      setChats(chats.filter(chat => chat.id !== chatId))
    } catch (error) {
      console.error('Error deleting chat:', error)
      alert('Failed to delete chat')
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`
    return date.toLocaleDateString()
  }

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading chat history...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-indigo-600">ViralLens</h1>
              <span className="text-sm text-gray-500">Chat History</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/chat"
                className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                New Chat
              </Link>
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {chats.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💬</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No chat history yet
            </h2>
            <p className="text-gray-500 mb-4">
              Start a conversation to see your chat history here
            </p>
            <Link
              to="/chat"
              className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Start New Chat
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {chat.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {chat.lastMessage || 'No messages'}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{chat.messageCount} message{chat.messageCount !== 1 ? 's' : ''}</span>
                      <span>•</span>
                      <span>{formatDate(chat.updatedAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Link
                      to="/chat"
                      state={{ chatId: chat.id }}
                      className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      Open
                    </Link>
                    <button
                      onClick={() => handleDelete(chat.id)}
                      className="px-3 py-1 text-sm text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatHistory

