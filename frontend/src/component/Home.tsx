import { ArrowRight, Code2, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09090b] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(124,131,255,.18),transparent_32rem)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]" />
      
      <Navbar />

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl flex-col items-center justify-center px-5 py-16 text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-sm text-zinc-300 shadow-[0_8px_30px_rgba(0,0,0,.24)] backdrop-blur-xl">
          <Sparkles className="h-4 w-4 text-[#a5a9ff]" />
          AI-powered code review
        </div>

        <h1 className="max-w-5xl text-5xl font-semibold leading-[1.03] tracking-[-0.055em] text-balance sm:text-6xl md:text-7xl">
          Write cleaner code.
          <span className="mt-2 block bg-gradient-to-r from-[#b7baff] via-[#858cff] to-[#c2a7ff] bg-clip-text text-transparent">
            Ship with confidence.
          </span>
        </h1>

        <p className="mt-7 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
          Get clear, actionable feedback on bugs, performance, security, and maintainability in seconds.
        </p>

        <Link to="/dashboard" className="group mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-zinc-950 shadow-[0_12px_40px_rgba(255,255,255,.12)] transition hover:-translate-y-0.5 hover:bg-zinc-100">
          Start reviewing
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>

        <div className="mt-14 grid w-full max-w-3xl grid-cols-1 gap-3 text-left sm:grid-cols-3">
          {[
            [Zap, "Instant feedback", "Understand issues quickly"],
            [ShieldCheck, "Best practices", "Catch risks before they ship"],
            [Code2, "Built for developers", "Clear fixes, not noisy reports"],
          ].map(([Icon, title, description]) => (
            <div key={title as string} className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 backdrop-blur-sm">
              <Icon className="mb-3 h-5 w-5 text-[#9da2ff]" />
              <p className="text-sm font-semibold text-zinc-200">{title as string}</p>
              <p className="mt-1 text-xs leading-5 text-zinc-500">{description as string}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;