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
})

module.exports = router;