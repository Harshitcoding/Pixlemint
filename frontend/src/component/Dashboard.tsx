import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { MessageSquare, Code2, Trash2, LogOut } from "lucide-react"

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
  const [currentSessionId, setCurrentSessionId] = useState<string>("")
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
        body: JSON.stringify({ 
          code,
          chatId: currentSessionId || undefined 
        }),
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
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-600 to-slate-900">
      <div className="max-w-7xl mx-auto p-6">
        
        <div className="flex gap-6">
          
          {isAuthenticated && (
            <div className="w-64 bg-slate-800/50 backdrop-blur rounded-xl border border-purple-500/20 p-4 flex-shrink:0 h-[calc(100vh-48px)] flex flex-col">
              <button
                onClick={startNewChat}
                className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium mb-4 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                New Chat
              </button>
              
              <div className="flex-1 overflow-y-auto">
                <h2 className="text-sm font-semibold text-slate-400 mb-3 px-2">Chat History</h2>
                
                {chatSessions.length === 0 ? (
                  <p className="text-slate-500 text-sm px-2">No previous chats</p>
                ) : (
                  <div className="space-y-1">
                    {chatSessions.map(session => (
                      <div
                        key={session._id}
                        className={`group rounded-lg p-3 transition-colors cursor-pointer ${
                          currentSessionId === session._id 
                            ? "bg-slate-700" 
                            : "hover:bg-slate-700/50"
                        }`}
                        onClick={() => loadSession(session._id)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">
                              {session.preview || session.title}
                            </p>
                            <p className="text-slate-400 text-xs mt-1">
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
              
              <div className="border-t border-slate-700 pt-4 mt-4">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}

          <div className="flex-1 flex flex-col">
            {!isAuthenticated && (
              <div className="mb-6 bg-purple-600/20 border border-purple-500/30 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold mb-1">Save Your Conversations</h3>
                  <p className="text-purple-200 text-sm">Login to access chat history and save your sessions</p>
                </div>
                <a
                  href="/login"
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
                >
                  Login
                </a>
              </div>
            )}
            
            <header className="mb-6">
              <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                <Code2 className="w-8 h-8" />
                Code Review AI
              </h1>
              <p className="text-purple-300 mt-1">Get instant AI-powered code optimization</p>
            </header>

            <div className="flex-1 flex flex-col">
            
              <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-purple-500/20 mb-6 flex-1 overflow-y-auto p-6">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <Code2 className="w-16 h-16 text-purple-400 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No messages yet</h3>
                    <p className="text-purple-300">Paste your code below to get started</p>
                    {!isAuthenticated && (
                      <p className="text-yellow-400 text-sm mt-4">
                        💡 Login to save your chat history
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {messages.map((msg, index) => (
                      <div key={index} className={`flex gap-4 ${msg.type === "user" ? "justify-end" : ""}`}>
                        {msg.type === "ai" && (
                          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink:0">
                            <Code2 className="w-4 h-4 text-white" />
                          </div>
                        )}
                        
                        <div className={`max-w-3xl ${msg.type === "user" ? "bg-purple-600" : "bg-slate-700"} rounded-lg p-4`}>
                          {msg.type === "ai" ? (
                            <div className="text-white prose prose-invert prose-sm max-w-none">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content)}
                              </ReactMarkdown>
                            </div>
                          ) : (
                            <pre className="text-white text-sm overflow-x-auto">
                              <code>{msg.content}</code>
                            </pre>
                          )}
                        </div>
                        
                        {msg.type === "user" && (
                          <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center flex-shrink:0">
                            <span className="text-white text-xs font-bold">YOU</span>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                          <Code2 className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-slate-700 rounded-lg p-4">
                          <p className="text-purple-300">Analyzing your code...</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-purple-500/20 p-6">
                <label className="block text-white font-medium mb-3">Your Code</label>
                <textarea
                  placeholder="Paste your code here..."
                  className="w-full h-32 bg-slate-900 text-white rounded-lg p-4 border border-slate-700 focus:border-purple-500 focus:outline-none resize-none font-mono text-sm"
                  onChange={e => setCode(e.target.value)}
                  value={code}
                />
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !code.trim()}
                  className="mt-4 w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
                >
                  {isLoading ? "Analyzing..." : "Review Code"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard