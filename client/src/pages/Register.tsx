import React, {FC, useEffect, useState} from "react"
import {motion} from "framer-motion";
import {Link, Navigate, useNavigate} from "react-router-dom";
import axios from "axios";

export const Register:FC = () => {

    const [mousePosition, setMousePosition] = useState({x: 0, y: 0})

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        setMousePosition({x: event.clientX, y: event.clientY})
    }

    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token')
            if(!token) {
                setIsAuthenticated(false)
                return
            }

            try{
                const response = await axios.get('http://localhost:5000/api/auth/verify', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if(response.status === 200) {
                    setIsAuthenticated(true)
                }
            }
            catch (e) {
                setIsAuthenticated(false)
            }
        }
        checkAuth()

    }, [])

    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(isLoading) return

        if(password !== confirmPassword) {
            setMessage('Passwords do not match!')
            return
        }

        setIsLoading(true)
        setMessage('')

        try{
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                email,
                password
            })

            setEmail('')
            setPassword('')
            setConfirmPassword('')
            setIsLoading(false)
            setMessage('Registered successfully!')

            console.log(response.data)

            setTimeout(() => navigate('/login'), 1000)

        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Error:", error.response?.data || error.message);
            } else {
                console.error("Error:", error);
            }
        }
    }

    if(isAuthenticated===undefined){
        return(
            <div>
                Checking Authentication
            </div>
        )
    }

    return isAuthenticated ? (
            <Navigate to="/home" />
        )
        :
        (
            <div
                onMouseMove={handleMouseMove}
                className="relative min-h-screen w-full overflow-hidden flex justify-center items-center"
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800"
                    style={{
                        backgroundSize: "150% 150%",
                    }}
                    animate={{
                        backgroundPosition: `${mousePosition.x / 20}% ${mousePosition.y / 20}%`,
                    }}
                    transition={{
                        ease: "linear",
                        duration: 0.1,
                    }}
                >
                    <div className="absolute top-5 left-5">
                        <Link to="/">
                            <button
                                className="text-2xl sm:text-3xl text-white font-bold mx-4 sm:mx-10 select-none h-12">Movie+
                            </button>
                        </Link>
                    </div>
                    <div className="absolute top-5 right-5">
                        <Link to="/login">
                            <button
                                className="text-sm sm:text-xl text-black font-bold mx-4 sm:mx-10 select-none bg-white w-24 sm:w-32 h-10 sm:h-12 rounded-full hover:bg-gray-200 active:bg-gray-300 transition">Sign
                                in
                            </button>
                        </Link>
                    </div>

                    <div className="min-h-screen px-4 py-12 flex flex-col items-center justify-center">
                        <form
                            onSubmit={handleSubmit}
                            className="w-full max-w-md bg-black/10 rounded-xl text-white p-6 sm:p-8"
                        >
                            <h1 className="text-2xl sm:text-3xl font-semibold mb-6 cursor-default">Join now!</h1>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 text-sm text-gray-900"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 text-sm text-gray-900"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                                        Repeat Password
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 text-sm text-gray-900"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                className="w-full mt-6 text-center text-white bg-gray-800 hover:bg-gray-900 transition font-medium rounded-md text-sm px-5 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? "Signing up..." : "Sign up"}
                            </button>
                        </form>
                        {message && (
                            <div
                                className={`mt-4 text-lg font-medium ${message === "Registered successfully!" ? "text-green-500" : "text-red-500"}`}>
                                {message}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        )
}