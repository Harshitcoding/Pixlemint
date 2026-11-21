import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { ArrowRight, Code2, Eye, EyeOff } from "lucide-react"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState("Signing in...")
    const [showPassword, setShowPassword] = useState(false)
    const Navigate = useNavigate()

    async function handlesubmit(e:any) {
        e.preventDefault()
        setError("")
        setLoading(true)
        setLoadingMessage("Signing in...")
        const warmingTimer = window.setTimeout(() => {
            setLoadingMessage("Waking the server...")
        }, 8000)

        try {
            const payload = {
                email: email,
                password: password
            }
            let res
            try {
                res = await axios.post("https://pixlemintt.onrender.com/auth/login", payload, { timeout: 60000 })
            } catch (firstError: any) {
                if (firstError.code === "ECONNABORTED" || !firstError.response) {
                    res = await axios.post("https://pixlemintt.onrender.com/auth/login", payload, { timeout: 60000 })
                } else {
                    throw firstError
                }
            }
            localStorage.setItem("token", res.data.data.token);
            console.log("login successfully", res.data)
            Navigate("/home")
        } catch (error: any) {
            console.log(error)
            if (error.code === "ECONNABORTED") {
                setError("The server is taking longer than expected. Please try again.")
            } else {
                setError(error.response?.data?.message || "Login failed. Please check your credentials.")
            }
        }
        finally {
            window.clearTimeout(warmingTimer)
            setLoading(false)
        }
    }

    return (
        <div className="grid min-h-screen bg-[#09090b] text-white md:grid-cols-[minmax(0,1fr)_minmax(420px,.9fr)]">
            {/* Form Section */}
            <div className="flex items-center justify-center px-5 py-12 sm:px-10">
                <div className="w-full max-w-[410px]">
                    <Link to="/home" className="mb-12 inline-flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06]">
                            <Code2 className="h-4 w-4 text-[#a5a9ff]" />
                        </div>
                        <span className="font-semibold">Pixlemint</span>
                    </Link>
                    <p className="mb-2 text-sm font-medium text-[#a5a9ff]">Welcome back</p>
                    <h2 className="mb-8 text-3xl font-semibold tracking-tight sm:text-4xl">Sign in to your account</h2>
                    <form onSubmit={handlesubmit} className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="login-email">Email</label>
                            <input id="login-email" type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)}
                                className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.055] px-4 text-sm text-white placeholder:text-zinc-600 transition focus:border-[#858cff]/60 focus:outline-none focus:ring-4 focus:ring-[#858cff]/10" />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="login-password">Password</label>
                            <div className="relative">
                                <input id="login-password" type={showPassword ? "text" : "password"} placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)}
                                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.055] px-4 pr-12 text-sm text-white placeholder:text-zinc-600 transition focus:border-[#858cff]/60 focus:outline-none focus:ring-4 focus:ring-[#858cff]/10" />
                                <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300">
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                        <button 
                            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#858cff] text-sm font-semibold text-white shadow-[0_10px_30px_rgba(124,131,255,.18)] transition hover:bg-[#9499ff] active:scale-[.99] disabled:cursor-not-allowed disabled:opacity-60"
                            type="submit" 
                            disabled={loading}
                        >
                            {loading ? loadingMessage : "Sign in"}
                            {!loading && <ArrowRight className="h-4 w-4" />}
                        </button>
                        {error && <div className="rounded-lg border border-red-400/15 bg-red-400/[0.07] px-3 py-2 text-center text-sm text-red-300">{error}</div>}
                        <div className="text-center text-sm text-zinc-500">
                            New to Pixlemint?{" "}
                            <Link 
                                className="font-medium text-zinc-200 hover:text-[#b4b7ff]" 
                                to="/signup"
                            >
                                Create an account
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* Image Section */}
            <div className="relative hidden overflow-hidden border-l border-white/[0.07] md:flex md:items-center md:justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(124,131,255,.24),transparent_18rem),linear-gradient(145deg,#111116,#09090b)]" />
                <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:40px_40px]" />
                <div className="relative mx-12 max-w-md">
                    <div className="rounded-2xl border border-white/10 bg-[#111116]/90 p-5 shadow-2xl backdrop-blur-xl">
                        <div className="mb-4 flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-400/70"/><span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70"/><span className="h-2.5 w-2.5 rounded-full bg-green-400/70"/></div>
                        <pre className="overflow-hidden text-xs leading-6 text-zinc-400"><code><span className="text-[#a5a9ff]">const</span> review = <span className="text-[#c2a7ff]">await</span> pixlemint.analyze({"{"}<br/>  <span className="text-zinc-200">quality:</span> <span className="text-green-300">"improved"</span>,<br/>  <span className="text-zinc-200">bugs:</span> <span className="text-green-300">"resolved"</span><br/>{"}"})</code></pre>
                    </div>
                    <p className="mt-7 text-3xl font-semibold leading-tight tracking-tight">Better code starts with a better review.</p>
                </div>
            </div>
        </div>
    )
}

export default Login