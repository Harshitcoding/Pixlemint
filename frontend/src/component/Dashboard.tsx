import { useState } from 'react'
import { BackgroundEffects } from '../component/ui/BackgroundEffects'
import { Sidebar } from '../component/Dashboard/Sidebar'
import { Header } from '../component/Dashboard/Header'
import { EmptyState } from '../component/Dashboard/EmptyState'
import { MessageList } from '../component/Dashboard/MessageList'
import { InputArea } from '../component/Dashboard/InputArea'
import { useAuth } from '../hooks/useAuth'
import { useChatHistory } from '../hooks/useChatHistory'
import { api } from '../services/api'
import type { Message } from '../types'

const Dashboard = () => {
  const [code, setCode] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentSessionId, setCurrentSessionId] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { isAuthenticated, logout, getToken } = useAuth()
  const { chatSessions, fetchHistory, deleteSession } = useChatHistory(getToken())

  const handleSubmit = async () => {
    if (!code.trim()) return
    
    const userMessage: Message = {
      type: "user",
      content: code,
      timestamp: new Date(),
    }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setCode("")
    setIsLoading(true)

    try {
      const data = await api.reviewCode(code, currentSessionId, getToken() || undefined)
      const aiMessage: Message = {
        type: "ai",
        content: data.review || data.response || JSON.stringify(data),
        timestamp: new Date(),
      }
      setMessages([...newMessages, aiMessage])
      
      if (data.chatId) {
        setCurrentSessionId(data.chatId)
        if (isAuthenticated) fetchHistory()
      }
    } catch (error) {
      setMessages([...newMessages, {
        type: "ai",
        content: "Failed to review code. Please try again.",
        timestamp: new Date(),
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const loadSession = async (sessionId: string) => {
    const token = getToken()
    if (!token) return
    
    try {
      const data = await api.loadChat(sessionId, token)
      if (data.success) {
        setMessages(data.data.messages.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        })))
        setCurrentSessionId(sessionId)
        setSidebarOpen(false)
      }
    } catch (error) {
      console.error('Failed to load chat:', error)
    }
  }

  const handleDeleteSession = async (id: string) => {
    const success = await deleteSession(id)
    if (success && currentSessionId === id) {
      setMessages([])
      setCurrentSessionId("")
    }
  }

  const startNewChat = () => {
    setMessages([])
    setCurrentSessionId("")
    setSidebarOpen(false)
  }

  return (
    <div className="h-screen overflow-hidden bg-black text-white">
      <BackgroundEffects />
      
      <div className="relative z-10 flex h-full">
        {/* Mobile sidebar overlay */}
        {isAuthenticated && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        {isAuthenticated && (
          <div className={`
            fixed md:relative inset-y-0 left-0 z-30 md:z-0
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}>
            <Sidebar
              chatSessions={chatSessions}
              onNewChat={startNewChat}
              onLoadSession={loadSession}
              onDeleteSession={handleDeleteSession}
              onLogout={logout}
            />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header isAuthenticated={isAuthenticated} />
          
          <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-6">
            {messages.length === 0 ? (
              <EmptyState isAuthenticated={isAuthenticated} />
            ) : (
              <MessageList messages={messages} isLoading={isLoading} />
            )}
          </div>

          <InputArea
            code={code}
            isLoading={isLoading}
            onChange={setCode}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Mobile menu button */}
       {/* Mobile menu button */}
{isAuthenticated && (
  <button
    onClick={() => setSidebarOpen(!sidebarOpen)}
    className="fixed top-4 left-4 z-40 md:hidden w-12 h-10  rounded-full text-white flex items-center justify-center shadow-lg"
  >
    {sidebarOpen ? '✕' : '☰'}
  </button>
)}

      </div>
    </div>
  )
}

export default Dashboard