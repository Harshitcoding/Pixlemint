import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { ArrowRight, Code2, Eye, EyeOff } from "lucide-react"

const Signup = () => {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Creating account...");
    const [showPassword, setShowPassword] = useState(false);
    const Navigate = useNavigate();

    async function handlesubmit(e:any) {
        e.preventDefault()
        setError("")
        setLoading(true)
        setLoadingMessage("Creating account...")
        const warmingTimer = window.setTimeout(() => {
            setLoadingMessage("Waking the server...")
        }, 8000)
        try {
            const payload = {
                FirstName: firstname,
                LastName: lastname,
                email: email,
                password: password
            };
            let res
            try {
                res = await axios.post("https://pixlemintt.onrender.com/auth/register", payload, { timeout: 60000 })
            } catch (firstError: any) {
                if (firstError.code === "ECONNABORTED" || !firstError.response || firstError.response.status === 503) {
                    await new Promise(resolve => window.setTimeout(resolve, 2500))
                    res = await axios.post("https://pixlemintt.onrender.com/auth/register", payload, { timeout: 60000 })
                } else {
                    throw firstError
                }
            }
            localStorage.setItem("token", res.data.data.token);
            console.log("signup success:", res.data)
            Navigate("/home");
        } catch (error:any) {
            if (error.code === "ECONNABORTED") {
                setError("The server is taking longer than expected. Please try again.")
            } else if (error.response?.status === 503) {
                setError("The server is starting. Please wait a moment and try again.")
            } else {
                setError(error.response?.data?.message || "Signup failed")
            }
            console.log(error)
        }
        finally {
            window.clearTimeout(warmingTimer)
            setLoading(false);
        }
    }

    return (
        <div className="grid min-h-screen bg-[#09090b] text-white md:grid-cols-[minmax(0,1fr)_minmax(420px,.9fr)]">
            {/* Form Section */}
            <div className="flex items-center justify-center px-5 py-10 sm:px-10">
                <div className="w-full max-w-[410px]">
                    <Link to="/home" className="mb-8 inline-flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06]">
                            <Code2 className="h-4 w-4 text-[#a5a9ff]" />
                        </div>
                        <span className="font-semibold">Pixlemint</span>
                    </Link>
                    <p className="mb-2 text-sm font-medium text-[#a5a9ff]">Get started</p>
                    <h2 className="mb-7 text-3xl font-semibold tracking-tight sm:text-4xl">Create your account</h2>
                    <form onSubmit={handlesubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="signup-first">First name</label>
                                <input id="signup-first" type="text" placeholder="John" required value={firstname} onChange={(e) => setFirstname(e.target.value)}
                                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.055] px-4 text-sm text-white placeholder:text-zinc-600 transition focus:border-[#858cff]/60 focus:outline-none focus:ring-4 focus:ring-[#858cff]/10" />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="signup-last">Last name</label>
                                <input id="signup-last" type="text" placeholder="Doe" required value={lastname} onChange={(e) => setLastname(e.target.value)}
                                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.055] px-4 text-sm text-white placeholder:text-zinc-600 transition focus:border-[#858cff]/60 focus:outline-none focus:ring-4 focus:ring-[#858cff]/10" />
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="signup-email">Email</label>
                            <input id="signup-email" type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)}
                                className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.055] px-4 text-sm text-white placeholder:text-zinc-600 transition focus:border-[#858cff]/60 focus:outline-none focus:ring-4 focus:ring-[#858cff]/10" />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="signup-password">Password</label>
                            <div className="relative">
                                <input id="signup-password" type={showPassword ? "text" : "password"} placeholder="Create a password" required value={password} onChange={(e) => setPassword(e.target.value)}
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
                            {loading ? loadingMessage : "Create account"}
                            {!loading && <ArrowRight className="h-4 w-4" />}
                        </button>
                        
                        {error && <div className="rounded-lg border border-red-400/15 bg-red-400/[0.07] px-3 py-2 text-center text-sm text-red-300">{error}</div>}
                        
                        <div className="text-center text-sm text-zinc-500">
                            Already have an account?{" "}
                            <Link 
                                className="font-medium text-zinc-200 hover:text-[#b4b7ff]" 
                                to="/login"
                            >
                                Sign in
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
                    <p className="mt-7 text-3xl font-semibold leading-tight tracking-tight">Your next review could be your best code yet.</p>
                </div>
            </div>
        </div>
    )
}

export default Signup