import { MessageSquare } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Message } from '../../types'

interface ChatMessageProps {
  message: Message
}

export const ChatMessage = ({ message }: ChatMessageProps) => (
  <div className={`flex gap-3 md:gap-4 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
    {message.type === "ai" && (
      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink:0">
        <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
      </div>
    )}
    <div
      className={`flex-1 max-w-3xl ${
        message.type === "user"
          ? "bg-white/10 border border-white/20"
          : "bg-white/5 border border-white/10"
      } rounded-2xl p-3 md:p-4`}
    >
      {message.type === "ai" ? (
        <div className="prose prose-invert prose-sm md:prose-base max-w-none text-gray-300">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {typeof message.content === "string" ? message.content : JSON.stringify(message.content)}
          </ReactMarkdown>
        </div>
      ) : (
        <pre className="text-xs md:text-sm bg-black/40 rounded-lg p-3 md:p-4 overflow-x-auto border border-white/10">
          <code className="text-gray-300">{message.content}</code>
        </pre>
      )}
    </div>
    {message.type === "user" && (
      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white text-black flex items-center justify-center flex-shrink:0 font-semibold text-xs">
        YOU
      </div>
    )}
  </div>
)
