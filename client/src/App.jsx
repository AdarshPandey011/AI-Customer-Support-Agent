import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Chat from './components/Chat'
import ChatHistory from './components/ChatHistory'
import { getAuthToken, removeAuthToken } from './utils/auth'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getAuthToken()
    setIsAuthenticated(!!token)
    setLoading(false)
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    removeAuthToken()
    setIsAuthenticated(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/chat" /> : <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/signup" 
            element={
              isAuthenticated ? <Navigate to="/chat" /> : <Signup onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/chat" 
            element={
              isAuthenticated ? (
                <Chat onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/history" 
            element={
              isAuthenticated ? (
                <ChatHistory onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/chat" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

