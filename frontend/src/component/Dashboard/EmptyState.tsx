import { Code2 } from 'lucide-react'

interface EmptyStateProps {
  isAuthenticated: boolean
}

export const EmptyState = ({ isAuthenticated }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center h-full text-center px-4">
    <div className="mb-6">
      <Code2 className="w-12 h-12 md:w-16 md:h-16 text-gray-600 mx-auto" />
    </div>
    <h2 className="text-xl md:text-2xl font-bold text-gray-300 mb-2">
      No messages yet
    </h2>
    <p className="text-sm md:text-base text-gray-500 mb-6">
      Paste your code below to get started
    </p>
    {!isAuthenticated && (
      <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-xs md:text-sm text-gray-400">
        💡 Login to save your chat history
      </div>
    )}
  </div>
)
