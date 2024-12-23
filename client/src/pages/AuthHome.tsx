import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Navbar } from '../components/Navbar'
import { MediaRow } from '../components/MediaRow'
import { ImageSlider } from '../components/ImageSlider'

interface Movie {
    id: number
    title: string
    poster_path: string
    backdrop_path: string
}

export const AuthHome: React.FC = () => {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([])
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([])
    const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([])



    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const responsePopular = await axios.get<{ results: Movie[] }>('http://localhost:5000/api/movies/popular')
                setPopularMovies(responsePopular.data.results)

                const responseTopRated = await axios.get<{ results: Movie[] }>('http://localhost:5000/api/movies/top-rated')
                setTopRatedMovies(responseTopRated.data.results)

                const responseUpComing = await axios.get<{ results: Movie[] }>('http://localhost:5000/api/movies/upcoming')
                setUpcomingMovies(responseUpComing.data.results)

                const responseNowPlaying = await axios.get<{ results: Movie[] }>('http://localhost:5000/api/movies/now-playing')
                setNowPlayingMovies(responseNowPlaying.data.results)

            } catch (error) {
                console.error('Error fetching movies:', error)
            }
        }

        fetchMovies()
    }, [])

    return (
        <div className="overflow-x-hidden min-h-screen bg-gray-800">
            <Navbar />
            <header className="h-[60vh]">
                {popularMovies.length > 0 && <ImageSlider movies={popularMovies.slice(0, 5)} />}
            </header>
            <main>
                <div>
                    <MediaRow title="Popular Movies" items={popularMovies} />
                    <MediaRow title="Top Rated Movies" items={topRatedMovies} />
                    <MediaRow title="Upcoming Movies" items={upcomingMovies} />
                    <MediaRow title="Now Playing" items={nowPlayingMovies} />
                </div>
            </main>
        </div>
    )
}

