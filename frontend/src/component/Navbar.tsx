

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Code2, LogOut, Menu, X } from "lucide-react"
import { Link } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#09090b]/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06]">
            <Code2 className="h-4 w-4 text-[#a5a9ff]" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Pixlemint</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 font-medium rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg text-white"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black px-6 pb-4 flex flex-col gap-2">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 font-medium rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg text-white w-full justify-center"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </header>
  )
}

export default Navbar
