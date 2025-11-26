import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="h-screen overflow-hidden bg-black text-white">
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-linear-to-br from-slate-900/20 via-black to-black pointer-events-none" />
      
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
        <div className="flex flex-col items-center justify-center px-6 py-24 md:py-32 text-center">
          
          {/* Badge */}
          <div className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-gray-300">
              AI-Powered Code Review
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 max-w-4xl leading-tight">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-gray-200 to-gray-400">
              Intelligent Code Reviews
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-8 leading-relaxed">
            Upload your code and get instant AI-powered reviews with actionable suggestions. 
            Improve code quality, catch bugs early, and follow best practices.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/dashboard">
              <button className="px-8 py-3 rounded-full bg-white text-black font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:scale-105 active:scale-95">
                Start Reviewing
              </button>
            </Link>
            
            <button className="px-8 py-3 rounded-full border border-white/30 text-white font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white/50 active:scale-95">
              Learn More
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;