import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Movie {
    id: number
    title: string
    backdrop_path: string
}

interface ImageSliderProps {
    movies: Movie[]
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ movies }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)
        }, 5000)

        return () => clearInterval(timer)
    }, [movies.length])

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length)
    }

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)
    }

    return (
        <div className="relative w-full h-full overflow-hidden">
            <AnimatePresence initial={false}>
                <motion.img
                    key={currentIndex}
                    src={`https://image.tmdb.org/t/p/original${movies[currentIndex]?.backdrop_path}`}
                    alt={movies[currentIndex]?.title}
                    className="absolute top-0 left-0 w-full h-full object-cover object-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                />
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                <h2 className="text-white text-2xl font-bold select-none">{movies[currentIndex]?.title}</h2>
            </div>
            <div className="absolute top-1/2 transform -translate-y-1/2 left-24 w-96 sm:flex hidden">
                <h1 className="text-5xl text-blue-800 font-bold select-none">Explore the latest movies on Movie+</h1>
            </div>
            <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                onClick={handlePrev}
            >
                <ChevronLeft size={24} />
            </button>
            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                onClick={handleNext}
            >
                <ChevronRight size={24} />
            </button>
        </div>
    )
}

