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
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.055]">
        <MessageSquare className="h-4 w-4 text-[#a5a9ff]" />
      </div>
    )}
    <div
      className={`flex-1 max-w-3xl ${
        message.type === "user"
          ? "border border-[#858cff]/20 bg-[#858cff]/10"
          : "border border-white/[0.08] bg-white/[0.035]"
      } rounded-2xl p-4 md:p-5`}
    >
      {message.type === "ai" ? (
        <div className="prose prose-invert prose-sm max-w-none text-zinc-300 md:prose-base">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {typeof message.content === "string" ? message.content : JSON.stringify(message.content)}
          </ReactMarkdown>
        </div>
      ) : (
        <pre className="overflow-x-auto rounded-xl border border-white/[0.07] bg-black/30 p-3 text-xs text-zinc-300 md:p-4 md:text-sm">
          <code>{message.content}</code>
        </pre>
      )}
    </div>
    {message.type === "user" && (
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-bold text-black">
        YOU
      </div>
    )}
  </div>
)
