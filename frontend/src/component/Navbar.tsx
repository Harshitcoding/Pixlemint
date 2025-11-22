import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-[#1e1e1e] shadow-md">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Left Logo / Brand */}
        <h1 className="text-white text-2xl font-semibold tracking-wide">
          AI Code Reviewer
        </h1>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition shadow-md"
        >
          Logout
        </button>

      </nav>
    </header>
  );
};

export default Navbar;
