import { Plus, LogOut } from 'lucide-react'
import { ChatSessionItem } from '../chat/ChatSession'
import type { ChatSession } from '../../types'

interface SidebarProps {
  chatSessions: ChatSession[]
  onNewChat: () => void
  onLoadSession: (id: string) => void
  onDeleteSession: (id: string) => void
  onLogout: () => void
}

export const Sidebar = ({ 
  chatSessions, 
  onNewChat, 
  onLoadSession, 
  onDeleteSession,
  onLogout 
}: SidebarProps) => {
  return (
    <div className="w-72 h-screen border-r border-white/10 bg-black/40 backdrop-blur-sm flex flex-col pt-16 md:pt-0">
      {/* 👆 Added pt-16 md:pt-0 */}

      {/* New Chat Button */}
      <div className="p-4 border-b border-white/10">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:bg-white/10 hover:scale-105 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          New Chat
        </button>
      </div>

      {/* Chat History */}
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
                <ChatSessionItem
                  key={session._id}
                  session={session}
                  onLoad={onLoadSession}
                  onDelete={onDeleteSession}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-white/10 mt-auto">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-white/30 text-white font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white/50 active:scale-95"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  )
}
