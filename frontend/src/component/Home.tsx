import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900/20 via-black to-black pointer-events-none" />
      
      {/* Grid pattern overlay */}
      <div 
        className="fixed inset-0 opacity-5 pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px'
        }} 
      />
      
      <Navbar />

      {/* Hero Section */}
      <div className="relative z-10 w-full">
        <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32 text-center min-h-[calc(100vh-80px)]">
          
          {/* Badge */}
          <div className="mb-4 sm:mb-6">
            <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-medium text-gray-300">
              AI-Powered Code Review
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 max-w-4xl leading-tight px-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
              Intelligent Code Reviews
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mb-6 sm:mb-8 leading-relaxed px-2">
            Upload your code and get instant AI-powered reviews with actionable suggestions. 
            Improve code quality, catch bugs early, and follow best practices.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
            <Link to="/dashboard" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-fulltext-white text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:scale-105 active:scale-95 text-sm sm:text-base">
                Start Reviewing
              </button>
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;