import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const Navigate = useNavigate()

    async function handlesubmit(e:any) {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const payload = {
                email: email,
                password: password
            }
            const res = await axios.post("https://pixlemintt.onrender.com/auth/login", payload)
            localStorage.setItem("token", res.data.data.token);
            console.log("login successfully", res.data)
            Navigate("/home")
        } catch (error) {
            console.log(error)
            setError("Login failed. Please check your credentials.")
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Form Section */}
            <div className="flex-1 bg-[#222] flex items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-md">
                    <h2 className="text-white text-3xl font-bold mb-8 text-center md:text-left">Welcome Back</h2>
                    <form onSubmit={handlesubmit} className="space-y-4">
                        <input 
                            type="email" 
                            placeholder="Email" 
                            required 
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-lg bg-[#1f1f1f] text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            required 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full p-3 rounded-lg bg-[#1f1f1f] text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                        <button 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            type="submit" 
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                        <div className="text-center mt-4">
                            <Link 
                                className="text-blue-400 hover:underline text-sm" 
                                to="/signup"
                            >
                                Don't have an account? Sign up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* Image Section */}
            <div className="flex-1 hidden md:flex items-center justify-center bg-gray-900">
                <img
                    src="/ai.jpg"
                    alt="AI Background"
                    className="object-cover w-full h-full"
                />
            </div>
        </div>
    )
}

export default Login