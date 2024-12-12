import React, {FC, useState} from "react";
import {motion} from "framer-motion"
import {Link} from "react-router-dom";
import axios from "axios";

export const Login:FC = () => {

    const [mousePosition, setMousePosition] = useState({x: 0, y: 0})

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        setMousePosition({x: event.clientX, y: event.clientY})
    }

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

    return (
        <div
            onMouseMove={handleMouseMove}
            className="relative h-screen w-screen overflow-hidden flex justify-center items-center"
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
                        <button className="text-3xl text-white font-bold mx-10 select-none h-12">Movie+</button>
                    </Link>
                </div>


                <div className="h-screen mt-[-6rem] flex flex-col items-center justify-center">
                    <form
                        onSubmit={handleSubmit}
                        className="lg:w-1/4 h-2/5 w-[80vw] bg-black/10 rounded-xl text-white">
                        <h1 className="lg:m-8 m-4 text-3xl font-semibold cursor-default">Sign in</h1>
                        <label htmlFor="email" className="block ml-[10%] text-md font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            className="appearance-none block mx-auto w-[80%] px-3 py-2 border border-gray-300 rounded-[5px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 lg:text-md sm:text-sm text-gray-900"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label htmlFor="password" className="block ml-[10%] text-md font-medium mt-4">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="appearance-none block mx-auto w-[80%] px-3 py-2 border border-gray-300 rounded-[5px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 lg:text-md sm:text-sm text-gray-900"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button
                            className="w-[80%] ml-[10%] mt-6 text-center text-white bg-gray-800 hover:bg-gray-900 transition font-medium rounded-[4px] text-sm px-5 py-2.5">
                            Sign in
                        </button>

                        <p className="ml-[10%] mt-5 text-lg text-gray-800 cursor-default">Don't have an account?
                            <Link to="/register">
                                <span className="text-white cursor-pointer"> Sign up now</span>
                            </Link>
                        </p>
                    </form>
                    {message && <div className={`text-xl font-medium ${message === "Logged in successfully!" ? "text-green-500" : "text-red-500"}`}>{message}</div>}
                </div>
            </motion.div>
        </div>
    )
}
