import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Dashboard = () => {
  const [code, setCode] = useState<string>("");
  const [response, setResponse] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"
  async function handleSubmit() {
    if (!code.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${VITE_API_URL}/code/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error(error);
      setResponse({
        error: "Failed to review code. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] py-10 px-5 text-white">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* LEFT CARD */}
          <div className="bg-[#2a2a2a] rounded-xl p-6 shadow-lg border border-gray-700">
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Your Code
            </label>

            <textarea
              placeholder="Paste your code here..."
              onChange={(e) => setCode(e.target.value)}
              value={code}
              className="w-full h-96 p-3 text-sm font-mono bg-[#1b1b1b] text-gray-100 border border-gray-700 rounded-lg resize-y focus:ring-2 focus:ring-gray-400 focus:outline-none"
            />

            <button
              onClick={handleSubmit}
              disabled={isLoading || !code.trim()}
              className="w-full mt-5 py-3 px-6 text-sm font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {isLoading ? "Analyzing..." : "Review Code"}
            </button>
          </div>

          {/* RIGHT CARD */}
          <div className="bg-[#2a2a2a] rounded-xl p-6 shadow-lg border border-gray-700">
            <label className="block text-sm font-semibold text-gray-300 mb-4">
              Review Results
            </label>

            <div className="bg-[#1b1b1b] border border-gray-700 rounded-lg p-5 min-h-[450px] max-h-[450px] overflow-y-auto">
              {response ? (
                response.error ? (
                  <div className="text-red-400 bg-red-900/20 p-3 rounded border border-red-700 text-sm">
                    {response.error}
                  </div>
                ) : (
                  <div className="prose prose-sm max-w-none text-gray-200">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {response.review || response}
                    </ReactMarkdown>
                  </div>
                )
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                  Submit your code to see the review
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
