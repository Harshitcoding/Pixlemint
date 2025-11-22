import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="bg-[#121212] text-white min-h-screen">
      
      {/* Navbar should be at the top */}
      <Navbar />

      {/* Page content below - now properly centered */}
      <div className="w-full flex flex-col items-center justify-center px-6 py-20 ">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Welcome to AI Code Reviewer
        </h1>
        <p className="text-gray-400 text-lg text-center max-w-2xl">
          You are logged in. Upload your code to get instant AI-powered reviews and suggestions.
        </p>
        
        {/* Optional: Add a CTA button */}
          <Link to="/dashboard"> 
        <button className="mt-8 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition">
          Start Reviewing Code
        </button>
          </Link>
      </div>

    </div>
  );
};

export default Home;