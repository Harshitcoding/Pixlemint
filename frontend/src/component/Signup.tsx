import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

const Signup = () => {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate();

    async function handlesubmit(e:any) {
        e.preventDefault()
        setError("")
        setLoading(true)
        try {
            const payload = {
                FirstName: firstname,
                LastName: lastname,
                email: email,
                password: password
            };
            const res = await axios.post("https://pixlemintt.onrender.com/auth/register", payload)
            localStorage.setItem("token", res.data.data.token);
            console.log("signup success:", res.data)
            Navigate("/home");
        } catch (error:any) {
            setError(error.response?.data?.message || "Signup Failed")
            console.log(error)
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Form Section */}
            <div className="flex-1 bg-[#222] flex items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-md">
                    <h2 className="text-white text-3xl font-bold mb-8 text-center md:text-left">Create Account</h2>
                    <form onSubmit={handlesubmit} className="space-y-4">
                        <input 
                            type="text" 
                            placeholder="First name" 
                            required 
                            onChange={(e) => setFirstname(e.target.value)}
                            className="w-full p-3 rounded-lg bg-[#1f1f1f] text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                        
                        <input 
                            type="text" 
                            placeholder="Last name" 
                            required 
                            onChange={(e) => setLastname(e.target.value)} 
                            className="w-full p-3 rounded-lg bg-[#1f1f1f] text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                        
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
                            {loading ? "Signing up..." : "Sign up"}
                        </button>
                        
                        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                        
                        <div className="text-center mt-4">
                            <Link 
                                className="text-blue-400 hover:underline text-sm" 
                                to="/login"
                            >
                                Already have an account? Login
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

export default Signup