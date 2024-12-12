import React, {FC, useState} from "react"
import {motion} from "framer-motion";
import {Link} from "react-router-dom";

export const Register:FC = () => {

    const [mousePosition, setMousePosition] = useState({x: 0, y: 0})

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        setMousePosition({x: event.clientX, y: event.clientY})
    }

    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(isLoading) return

        if(password !== confirmPassword) {
            setMessage('Passwords do not match!')
            return
        }

        setIsLoading(true)
        setMessage('')
    }

    return(
        <div
            onMouseMove={handleMouseMove}
            className="relative h-screen w-screen overflow-hidden flex justify-center items-center"
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
                        <button className="text-3xl text-white font-bold mx-10 select-none h-12">Movie+</button>
                    </Link>
                </div>
                <div className="absolute top-5 right-5">
                    <Link to="/login">
                        <button className="text-xl text-black font-bold mx-10 select-none bg-white w-32 h-12 rounded-full hover:bg-gray-200 active:bg-gray-300 transition">Sign in</button>
                    </Link>
                </div>



                <div className="h-screen mt-[-6rem] flex flex-col items-center justify-center">
                    <form
                        onSubmit={handleSubmit}
                        className="lg:w-1/4 h-2/5 m-8 w-[80vw] bg-black/10 rounded-xl text-white">
                        <h1 className="lg:m-8 m-4 text-3xl font-semibold cursor-default">Join now!</h1>
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
                        <label htmlFor="password" className="block ml-[10%] text-md font-medium mt-4">
                            Repeat Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="appearance-none block mx-auto w-[80%] px-3 py-2 border border-gray-300 rounded-[5px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 lg:text-md sm:text-sm text-gray-900"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        <button
                            className="w-[80%] ml-[10%] mt-6 text-center text-white bg-gray-800 hover:bg-gray-900 transition font-medium rounded-[4px] text-sm px-5 py-2.5"
                            type="submit"
                            disabled={isLoading}>
                            {isLoading ? "Signing up..." : "Sign up"}
                        </button>
                    </form>
                    {message && <div className="text-xl font-medium text-red-500">{message}</div>}
                </div>

            </motion.div>
        </div>
    )
}