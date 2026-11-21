import { Code2 } from 'lucide-react'

interface HeaderProps {
  isAuthenticated: boolean
}

export const Header = ({ isAuthenticated }: HeaderProps) => (
  <div className="border-b border-white/[0.07] bg-[#09090b]/85 backdrop-blur-xl">
    <div className="px-4 py-3 md:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 md:ml-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05]">
            <Code2 className="h-4 w-4 text-[#a5a9ff]" />
          </div>
          <span className="text-sm font-semibold">Code Review</span>
        </div>
        {!isAuthenticated && (
          <a href="/login">
            <button className="px-4 md:px-6 py-2 text-sm rounded-full bg-white text-black font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:scale-105 active:scale-95">
              Login
            </button>
          </a>
        )}
      </div>
    </div>
  </div>
)