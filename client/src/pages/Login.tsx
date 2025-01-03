import React, {FC, useEffect, useState} from "react";
import {motion} from "framer-motion"
import {Link, Navigate} from "react-router-dom";
import axios from "axios";

export const Login:FC = () => {

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
    const [message, setMessage] = useState('')

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if(isLoading) return

        setIsLoading(true)

        try{
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            })

            setMessage('Logged in successfully!')

            setEmail('')
            setPassword('')
            setIsLoading(false)

            localStorage.setItem('token', response.data.token)
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Error:", error.response?.data || error.message)
                setMessage(error.response?.data.message)
            } else {
                console.error("Error:", error)
                setMessage('Something went wrong!')
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
                    className="absolute inset-0 bg-gradient-to-r from-purple-900 via-indigo-500 to-blue-500"
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
                            <button className="text-3xl text-white font-bold mx-4 sm:mx-10 select-none h-12">Movie+
                            </button>
                        </Link>
                    </div>

                    <div className="min-h-screen px-4 flex flex-col items-center justify-center">
                        <form
                            onSubmit={handleSubmit}
                            className="w-full max-w-md bg-black/10 rounded-xl text-white p-6 sm:p-8"
                        >
                            <h1 className="text-2xl sm:text-3xl font-semibold mb-6 cursor-default">Sign in</h1>
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
                            </div>
                            <button
                                type="submit"
                                className="w-full mt-6 text-center text-white bg-gray-800 hover:bg-gray-900 transition font-medium rounded-md text-sm px-5 py-2.5"
                            >
                                Sign in
                            </button>
                            <p className="mt-4 text-md text-gray-300 cursor-default">
                                Don't have an account?
                                <Link to="/register">
                                    <span className="text-white cursor-pointer ml-1 hover:underline">Sign up now!</span>
                                </Link>
                            </p>
                        </form>
                        {message && (
                            <div
                                className={`mt-4 text-lg font-medium ${message === "Logged in successfully!" ? "text-green-500" : "text-red-500"}`}>
                                {message}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        )
}
