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
            const res = await axios.post("http://localhost:3000/auth/register", payload,)
             localStorage.setItem("token", res.data.data.token);

            console.log("signup success:", res.data)
            Navigate("/home");
        } catch (error:any) {
            setError(error.response?.data?.message || "signup Failed")
            console.log(error)
        }
        finally {
            setLoading(false);
        }

    }

    return (
     <div className="flex h-screen">
          <div className="flex-1 bg-[#222] flex items-center justify-center p-10">
         <form onSubmit={handlesubmit}>
            <input 
            type="text" 
            placeholder="first name" 
            required 
            onChange={(e) => setFirstname(e.target.value)}
            className="w-full mb-4 p-3 rounded-lg bg-[#1f1f1f] text-white outline-none focus:ring focus:ring-blue-500"
            />
            
            <input 
            type="text" 
            placeholder="last name" 
            required 
            onChange={(e) => setLastname(e.target.value)} 
            className="w-full mb-4 p-3 rounded-lg bg-[#1f1f1f] text-white outline-none focus:ring focus:ring-blue-500"
            />
            <input 
            type="email" 
            placeholder="email" 
            required onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 rounded-lg bg-[#1f1f1f] text-white outline-none focus:ring focus:ring-blue-500"
            />
            <input 
            type="password" 
            placeholder="password" 
            required 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full mb-4 p-3 rounded-lg bg-[#1f1f1f] text-white outline-none focus:ring focus:ring-blue-500"
            />
            <button 
             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
            type="submit" 
            disabled={loading}>{loading ? "Signing..." : "Signup"}
            </button>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <Link 
            className="text-blue-400 hover:underline" 
            to="/login">Already have an account? Login
            </Link>
        </form>
       </div>
       <div className="flex-1  flex items-center justify-center">
        <img
        src="/public/ai.png"
        className="object-cover w-full h-full"
        />
       </div>
     </div>
    )
}
export default Signup