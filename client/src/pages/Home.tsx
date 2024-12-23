import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion"
import axios from "axios"
import { Link } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area.tsx"

const Home: FC = () => {
    const [movies, setMovies] = useState([])
    const [textPos, setTextPos] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const { clientX, clientY } = event
            const displacementX = Math.sin(clientX * 0.01) * 20
            const displacementY = Math.cos(clientY * 0.01) * 20
            setTextPos({ x: displacementX, y: displacementY })
        }

        const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
            if (event.beta && event.gamma) {
                const displacementX = Math.sin(event.gamma * 0.1) * 10
                const displacementY = Math.sin(event.beta * 0.1) * 10
                setTextPos({ x: displacementX, y: displacementY })
            }
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("deviceorientation", handleDeviceOrientation)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("deviceorientation", handleDeviceOrientation)
        }
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/movies/popular")
                setMovies(response.data.results)
            } catch (e) {
                console.error("Error fetching movies:", e)
            }
        }

        fetchMovies()
    }, []);

    return (
        <div className="overflow-hidden">
            <header className="min-h-[60vh] bg-blue-700 pb-8">
                <nav className="flex justify-between items-center py-5 px-4 sm:px-10">
                    <Link to="/">
                        <button className="text-2xl sm:text-3xl text-white font-bold select-none h-12">Movie+</button>
                    </Link>
                    <Link to="/login">
                        <button className="text-sm sm:text-xl text-black font-bold select-none bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-gray-200 active:bg-gray-300 transition">Sign in</button>
                    </Link>
                </nav>
                <div className="flex flex-col items-center justify-center mt-16 sm:mt-24 px-4">
                    <motion.h1
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold text-center select-none z-20 max-w-4xl"
                        animate={{ x: textPos.x, y: textPos.y }}
                        transition={{ type: "spring", stiffness: 50, damping: 20 }}
                    >
                        Explore unlimited movies and TV shows.
                    </motion.h1>
                    <motion.p
                        className="text-xl sm:text-2xl text-white select-none mt-4"
                        animate={{ x: textPos.x, y: textPos.y }}
                        transition={{ type: "spring", stiffness: 50, damping: 20 }}
                    >
                        All for free!
                    </motion.p>
                </div>
            </header>
            <div className="flex flex-col bg-gradient-to-b from-gray-600 to-gray-900 z-30 p-4 sm:p-8 shadow-lg">
                <div className="flex flex-col items-center py-4 sm:py-8">
                    <h2 className="text-lg sm:text-xl text-white select-none text-center">Ready to get started? Register now!</h2>
                    <Link to="/register">
                        <button className="text-base sm:text-xl text-white px-6 sm:px-10 py-2 sm:py-3 mt-4 select-none bg-blue-700 rounded-full hover:bg-blue-800 active:bg-blue-900 transition">Join now</button>
                    </Link>
                </div>

                <div className="w-full h-60 sm:h-72 whitespace-nowrap rounded-md overflow-hidden">
                    <ScrollArea>
                        <div className="flex w-max space-x-4 p-4 scrollbar-hide scroll-smooth">
                            {movies.map((movie: any) => (
                                <div key={movie.id} className="inline-block">
                                    <div className="overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                        <img
                                            draggable="false"
                                            className="h-52 sm:h-60 w-36 sm:w-40 object-cover rounded-lg shadow-md select-none"
                                            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                            alt={movie.title}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
}

export default Home
