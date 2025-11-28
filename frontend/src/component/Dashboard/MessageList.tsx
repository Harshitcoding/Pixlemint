import { MessageSquare } from 'lucide-react'
import { ChatMessage } from '../chat/ChatMessage'
import type { Message } from '../../types'

interface MessageListProps {
  messages: Message[]
  isLoading: boolean
}

export const MessageList = ({ messages, isLoading }: MessageListProps) => (
  <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto">
    {messages.map((msg, index) => (
      <ChatMessage key={index} message={msg} />
    ))}
    {isLoading && (
      <div className="flex gap-3 md:gap-4 justify-start">
        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink:0">
          <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
        </div>
        <div className="flex-1 max-w-3xl bg-white/5 border border-white/10 rounded-2xl p-3 md:p-4">
          <p className="text-sm md:text-base text-gray-400">Analyzing your code...</p>
        </div>
      </div>
    )}
  </div>
)