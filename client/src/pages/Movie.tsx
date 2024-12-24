import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

interface MovieData {
    id: number
    title: string
    overview: string
    poster_path: string
    backdrop_path: string
}

export const Movie: React.FC = () => {
    const [movieData, setMovieData] = useState<MovieData | null>(null)
    const { id } = useParams<{id : string}>()

    useEffect(() => {
        const fetchMovie = async () => {
            try{
                const response = await axios.get(`http://localhost:5000/api/movies/browse/${id}`)
                setMovieData(response.data)
            }
            catch (e) {
                console.error('Error fetching quiz', e)
            }
        }

        fetchMovie()
    }, [id]);

    if(!movieData) {
        return (
            <div>Loading</div>
        )
    }

    return(
        <div>
            <h1>{movieData.title}</h1>
        </div>
    )
}