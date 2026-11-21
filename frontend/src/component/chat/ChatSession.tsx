import { Trash2 } from 'lucide-react'
import type { ChatSession as ChatSessionType } from '../../types'

interface ChatSessionProps {
  session: ChatSessionType
  onLoad: (id: string) => void
  onDelete: (id: string) => void
}

export const ChatSessionItem = ({ session, onLoad, onDelete }: ChatSessionProps) => (
  <div
    className="group relative cursor-pointer rounded-xl border border-transparent p-3 transition hover:border-white/[0.08] hover:bg-white/[0.04]"
    onClick={() => onLoad(session._id)}
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
          onDelete(session._id)
        }}
        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity flex-shrink:0"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  </div>
)