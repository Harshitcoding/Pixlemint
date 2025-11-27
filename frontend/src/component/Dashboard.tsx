import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { MessageSquare, Code2, Trash2, LogOut, Plus } from "lucide-react"

interface Message {
  type: "user" | "ai"
  content: string
  timestamp: Date
}

interface ChatSession {
  _id: string
  title: string
  preview: string
  createdAt: string
  updatedAt: string
}

const Dashboard = () => {
  const [code, setCode] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
    if (token) {
      fetchChatHistory()
    }
  }, [])

  async function fetchChatHistory() {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const res = await fetch('https://pixlemintt.onrender.com/chat/history', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) {
        setChatSessions(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch chat history:', error)
    }
  }

  async function handleSubmit() {
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
      const token = localStorage.getItem('token')
      const res = await fetch("https://pixlemintt.onrender.com/code/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ code, chatId: currentSessionId || undefined }),
      })
      const data = await res.json()
      const aiMessage: Message = {
        type: "ai",
        content: data.review || data.response || JSON.stringify(data),
        timestamp: new Date(),
      }
      const finalMessages = [...newMessages, aiMessage]
      setMessages(finalMessages)
      if (data.chatId) {
        setCurrentSessionId(data.chatId)
        if (isAuthenticated) {
          fetchChatHistory()
        }
      }
    } catch (error) {
      const errorMessage: Message = {
        type: "ai",
        content: "Failed to review code. Please try again.",
        timestamp: new Date(),
      }
      setMessages([...newMessages, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  async function loadSession(sessionId: string) {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const res = await fetch(`https://pixlemintt.onrender.com/chat/${sessionId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) {
        setMessages(data.data.messages.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        })))
        setCurrentSessionId(sessionId)
      }
    } catch (error) {
      console.error('Failed to load chat:', error)
    }
  }

  async function deleteSession(id: string) {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      await fetch(`https://pixlemintt.onrender.com/chat/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setChatSessions(prev => prev.filter(s => s._id !== id))
      if (currentSessionId === id) {
        setMessages([])
        setCurrentSessionId("")
      }
    } catch (error) {
      console.error('Failed to delete chat:', error)
    }
  }

  function startNewChat() {
    setMessages([])
    setCurrentSessionId("")
  }

  function handleLogout() {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setChatSessions([])
    setMessages([])
    setCurrentSessionId("")
    window.location.href = '/login'
  }

  return (
    <div className="h-screen overflow-hidden bg-black text-white">
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-linear-to-br from-slate-900/20 via-black to-black pointer-events-none" />
      
      {/* Grid pattern overlay */}
      <div 
        className="fixed inset-0 opacity-5 pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px'
        }} 
      />

      <div className="relative z-10 flex h-full">
        {/* Sidebar */}
        {isAuthenticated && (
          <div className="w-72 border-r border-white/10 bg-black/40 backdrop-blur-sm flex flex-col">
            <div className="p-4 border-b border-white/10">
              <button
                onClick={startNewChat}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:scale-105 active:scale-95"
              >
                <Plus className="w-5 h-5" />
                New Chat
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                  Chat History
                </h3>
                {chatSessions.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-8">
                    No previous chats
                  </p>
                ) : (
                  <div className="space-y-2">
                    {chatSessions.map(session => (
                      <div
                        key={session._id}
                        className="group relative p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 cursor-pointer transition-all duration-200"
                        onClick={() => loadSession(session._id)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                              {session.preview || session.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(session.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteSession(session._id)
                            }}
                            className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity flex-shrink:0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-white/30 text-white font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white/50 active:scale-95"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="border-b border-white/10 bg-black/40 backdrop-blur-sm">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                    Code Review AI
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">
                    Get instant AI-powered code optimization
                  </p>
                </div>
                {!isAuthenticated && (
                  <a href="/login">
                    <button className="px-6 py-2 rounded-full bg-white text-black font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:scale-105 active:scale-95">
                      Login
                    </button>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="mb-6">
                  <Code2 className="w-16 h-16 text-gray-600 mx-auto" />
                </div>
                <h2 className="text-2xl font-bold text-gray-300 mb-2">
                  No messages yet
                </h2>
                <p className="text-gray-500 mb-6">
                  Paste your code below to get started
                </p>
                {!isAuthenticated && (
                  <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-sm text-gray-400">
                    💡 Login to save your chat history
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6 max-w-4xl mx-auto">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex gap-4 ${
                      msg.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.type === "ai" && (
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink:0">
                        <MessageSquare className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                    <div
                      className={`flex-1 max-w-3xl ${
                        msg.type === "user"
                          ? "bg-white/10 border border-white/20"
                          : "bg-white/5 border border-white/10"
                      } rounded-2xl p-4`}
                    >
                      {msg.type === "ai" ? (
                        <div className="prose prose-invert max-w-none text-gray-300">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {typeof msg.content === "string"
                              ? msg.content
                              : JSON.stringify(msg.content)}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <pre className="text-sm bg-black/40 rounded-lg p-4 overflow-x-auto border border-white/10">
                          <code className="text-gray-300">{msg.content}</code>
                        </pre>
                      )}
                    </div>
                    {msg.type === "user" && (
                      <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center flex-shrink:0 font-semibold text-sm">
                        YOU
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-4 justify-start">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink:0">
                      <MessageSquare className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1 max-w-3xl bg-white/5 border border-white/10 rounded-2xl p-4">
                      <p className="text-gray-400">Analyzing your code...</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-white/10 bg-black/40 backdrop-blur-sm p-6">
            <div className="max-w-4xl mx-auto">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Your Code
              </label>
              <textarea
                className="w-full h-32 bg-black/60 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent resize-none font-mono text-sm"
                placeholder="Paste your code here..."
                onChange={(e) => setCode(e.target.value)}
                value={code}
              />
              <button
                onClick={handleSubmit}
                disabled={isLoading || !code.trim()}
                className="mt-4 w-full text-white font-semibold py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:scale-105 active:scale-95 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                {isLoading ? "Analyzing..." : "Review Code"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard