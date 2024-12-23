const express = require('express');
const router = express.Router();

router.get('/popular', async (req, res) => {
    try{
        const response = await fetch('https://api.themoviedb.org/3/discover/movie', {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
            },
        });

        if(!response.ok){
            const errorDetails = await response.text();
            console.error(`TMDB API Error: ${response.status} - ${errorDetails}`);
            return res.status(response.status).json({ error: 'Failed to fetch movies from TMDB API' });
        }

        const data = await response.json();
        res.json(data);
    }
    catch (e) {
        console.error('Error in /movies route:', e);
        res.status(500).json({error: 'Failed to fetch movies from TMDB API'});
    }
});

router.get('/upcoming', async (req, res) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
            },
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            console.error(`TMDB API Error: ${response.status} - ${errorDetails}`);
            return res.status(response.status).json({ error: 'Failed to fetch upcoming movies' });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error in /upcoming route:', error);
        res.status(500).json({ error: 'Failed to fetch upcoming movies' });
    }
});

router.get('/top-rated', async (req, res) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
            },
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            console.error(`TMDB API Error: ${response.status} - ${errorDetails}`);
            return res.status(response.status).json({ error: 'Failed to fetch top-rated movies' });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error in /top-rated route:', error);
        res.status(500).json({ error: 'Failed to fetch top-rated movies' });
    }
});

router.get('/now-playing', async (req, res) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
            },
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            console.error(`TMDB API Error: ${response.status} - ${errorDetails}`);
            return res.status(response.status).json({ error: 'Failed to fetch now-playing movies' });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error in /now-playing route:', error);
        res.status(500).json({ error: 'Failed to fetch now-playing movies' });
    }
});

router.get('/details/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
            },
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            console.error(`TMDB API Error: ${response.status} - ${errorDetails}`);
            return res.status(response.status).json({ error: `Failed to fetch details for movie ID ${id}` });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(`Error in /details/${id} route:`, error);
        res.status(500).json({ error: `Failed to fetch details for movie ID ${id}` });
    }
});

router.get('/genre/:genreId', async (req, res) => {
    const { genreId } = req.params;
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
            },
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            console.error(`TMDB API Error: ${response.status} - ${errorDetails}`);
            return res.status(response.status).json({ error: `Failed to fetch movies for genre ID ${genreId}` });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(`Error in /genre/${genreId} route:`, error);
        res.status(500).json({ error: `Failed to fetch movies for genre ID ${genreId}` });
    }
});

router.get('/search', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
            },
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            console.error(`TMDB API Error: ${response.status} - ${errorDetails}`);
            return res.status(response.status).json({ error: 'Failed to fetch search results' });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error in /search route:', error);
        res.status(500).json({ error: 'Failed to fetch search results' });
    }
});

module.exports = router;