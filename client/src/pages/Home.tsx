import {useEffect, useState} from "react";
import {motion} from "framer-motion"
import axios from "axios";

const Home = () => {
    const [movies, setMovies] = useState([])

    const [textPos, setTextPos] = useState({x: 0, y: 0})

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const {clientX, clientY} = event

            const displacementX = Math.sin(clientX * 0.01) * 20
            const displacementY = Math.cos(clientY * 0.01) * 20
            setTextPos({x: displacementX, y: displacementY})
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            try{
                const response = await axios.get("http://localhost:5000/api/movies/popular")
                setMovies(response.data.results)
                console.log(response.data)
            }
            catch (e) {
                console.log(e)
            }
        }

        fetchMovies()
    }, []);

    return(
        <>
            <header className="h-[60vh] bg-blue-700">
                <nav className="flex justify-between">
                    <button className="text-3xl text-white font-bold mx-10 select-none">Movie+</button>
                    <button className="text-xl text-black font-bold mx-10 my-9 bg-white w-32 h-12 rounded-full">Login
                    </button>
                </nav>
                <div className="flex flex-col items-center justify-center mt-32">
                    <motion.h1
                        className="text-6xl text-white font-bold lg:w-1/3 sm:w-1/2 text-center lg:p-10 sm:p-5 select-none z-20"
                        animate={{ x: textPos.x, y: textPos.y }}
                        transition={{type: "spring", stiffness: 50, damping: 20}}
                    >Explore unlimited movies and TV shows.</motion.h1>
                    <motion.p className="text-2xl text-white select-none" animate={{ x: textPos.x, y: textPos.y }}
                              transition={{type: "spring", stiffness: 50, damping: 20}}>For only $3.99</motion.p>
                </div>

            </header>
            <div className="flex h-[40vh] bg-gray-600 z-30">
                {movies.map((movie: any) => (
                    <div key={movie.id}>
                        <img className="w-32" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home