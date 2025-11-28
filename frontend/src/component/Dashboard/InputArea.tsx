interface InputAreaProps {
  code: string
  isLoading: boolean
  onChange: (value: string) => void
  onSubmit: () => void
}

export const InputArea = ({ code, isLoading, onChange, onSubmit }: InputAreaProps) => (
  <div className="border-t border-white/10 bg-black/40 backdrop-blur-sm p-4 md:p-6">
    <div className="max-w-4xl mx-auto">
      <label className="block text-xs md:text-sm font-medium text-gray-400 mb-2">
        Your Code
      </label>
      <textarea
        className="w-full h-24 md:h-32 bg-black/60 border border-white/20 rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent resize-none font-mono"
        placeholder="Paste your code here..."
        onChange={(e) => onChange(e.target.value)}
        value={code}
      />
      <button
        onClick={onSubmit}
        disabled={isLoading || !code.trim()}
        className="mt-3 md:mt-4 w-full text-white font-semibold py-2.5 md:py-3 text-sm md:text-base rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:scale-105 active:scale-95 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none bg-white/10"
      >
        {isLoading ? "Analyzing..." : "Review Code"}
      </button>
    </div>
  </div>
)
