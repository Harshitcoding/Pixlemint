

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { LogOut, Menu, X } from "lucide-react"

const Navbar = () => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <header className="bg-black border-b border-white/10 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent hover:from-gray-100 hover:to-gray-300 transition-all cursor-pointer">
          Pixlemint
        </h1>

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
