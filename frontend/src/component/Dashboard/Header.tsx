interface HeaderProps {
  isAuthenticated: boolean
}

export const Header = ({ isAuthenticated }: HeaderProps) => (
  <div className="border-b border-white/10 bg-black/40 backdrop-blur-sm">
    <div className="px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
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