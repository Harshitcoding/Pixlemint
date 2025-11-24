import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Dashboard = () => {
  const [code, setCode] = useState<string>("");
  const [response, setResponse] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit() {
    if (!code.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch("https://pixlemintt.onrender.com/code/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      setResponse(data); // expecting backend to send markdown text
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
    <div className="min-h-screen bg-gray-800 py-10 px-5">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Code Input */}
          <div className="bg-gray-500 rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Code
              </label>
              <textarea
                placeholder="Paste your code here..."
                onChange={(e) => setCode(e.target.value)}
                value={code}
                className="w-full h-96 p-3 text-sm font-mono border border-gray-300 rounded-md resize-y bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading || !code.trim()}
              className="w-full py-3 px-6 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Analyzing..." : "Review Code"}
            </button>
          </div>

          {/* Right: Review Output */}
          <div className="bg-gray-800 rounded-lg border border-gray-200 p-6 shadow-sm text-white">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Review Results
            </label>

            <div className="bg-gray-800 border border-gray-200 rounded-md p-5 min-h-[450px] max-h-[450px] overflow-y-auto prose prose-sm prose-gray max-w-none">
              {response ? (
                <>
                  {response.error ? (
                    <div className="text-red-600 text-sm p-3 bg-red-50 rounded border border-red-200">
                      {response.error}
                    </div>
                  ) : (
                    <div className="prose prose-sm max-w-none text-black">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {response.review || response}
                      </ReactMarkdown>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm text-center">
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
