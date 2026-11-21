import { Send } from 'lucide-react'

interface InputAreaProps {
  code: string
  isLoading: boolean
  onChange: (value: string) => void
  onSubmit: () => void
}

export const InputArea = ({ code, isLoading, onChange, onSubmit }: InputAreaProps) => (
  <div className="border-t border-white/[0.07] bg-[#09090b]/95 px-3 py-3 backdrop-blur-xl md:px-6 md:py-4">
    <div className="mx-auto max-w-4xl rounded-2xl border border-white/[0.09] bg-white/[0.035] p-2 shadow-[0_-10px_40px_rgba(0,0,0,.18)]">
      <textarea
        className="h-20 w-full resize-none rounded-xl bg-transparent px-3 py-2 font-mono text-sm leading-6 text-zinc-200 placeholder:text-zinc-600 focus:outline-none md:h-24"
        placeholder="Paste code or describe what you want reviewed..."
        onChange={(e) => onChange(e.target.value)}
        value={code}
        onKeyDown={(e) => {
          if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') onSubmit()
        }}
      />
      <div className="flex items-center justify-between px-1">
        <span className="hidden text-xs text-zinc-600 sm:inline">Ctrl + Enter to review</span>
        <button
          onClick={onSubmit}
          disabled={isLoading || !code.trim()}
          className="ml-auto flex h-9 items-center gap-2 rounded-lg bg-[#858cff] px-3.5 text-sm font-semibold text-white transition hover:bg-[#9499ff] disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
        >
          {isLoading ? "Analyzing..." : "Review"}
          {!isLoading && <Send className="h-4 w-4" />}
        </button>
      </div>
    </div>
  </div>
)
