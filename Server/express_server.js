import express from 'express';
import pgPool from './pgPool.js';
import dotenv from 'dotenv';

dotenv.config();

var app = express();

// Middleware
app.use(express.json());

// Server
app.listen(3001, () => {
    console.log('The server is running');
});

// ENDPOINTS

// Add genre
app.post('/genres', async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Genre name is required' });
    }
    try {
        const result = await pgPool.query(
            "INSERT INTO genres (genre_name) VALUES ($1) RETURNING *",
            [name]
        );
        res.status(201).json({ message: `Genre '${result.rows[0].genre_name}' added successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add genre' });
    }
});

// Add movie 
app.post('/movies', async (req, res) => {
    const { name, year, genre_name } = req.body;
    if (!name || !year || !genre_name) {
        return res.status(400).json({ error: 'Name, year, and genre_name are required' });
    }
    try {
        const genreResult = await pgPool.query(
            "SELECT id FROM genres WHERE genre_name = $1",
            [genre_name]
        );
        if (genreResult.rows.length === 0) {
            return res.status(400).json({ error: `Genre '${genre_name}' not found` });
        }
        const genreId = genreResult.rows[0].id;

        const query = "INSERT INTO movies (name, year, genre_id) VALUES ($1, $2, $3) RETURNING *";
        const result = await pgPool.query(query, [name, year, genreId]);

        const addedMovie = result.rows[0];

        res.status(201).json({
            message: `Movie '${addedMovie.name}' added successfully`,
            movie: {
                id: addedMovie.id,
                name: addedMovie.name,
                year: addedMovie.year,
                genre_name,
            },
        });
    } catch (error) {
        console.error('Error adding movie:', error);
        res.status(500).json({ error: 'Failed to add movie' });
    }
});

// Add registering user
app.post('/users', async (req, res) => {
    const { name, username, password, yearOfBirth } = req.body;
    if (!name || !username || !password || !yearOfBirth) {
        return res.status(400).json({ error: 'All user fields are required' });
    }
    try {
        const userCheck = await pgPool.query(
            "SELECT id FROM viewers WHERE user_name = $1",
            [username]
        );
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        const result = await pgPool.query(
            `INSERT INTO viewers (name, user_name, password, year_of_birth) 
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, username, password, yearOfBirth]
        );
        const { password: _, ...user } = result.rows[0];
        res.status(201).json({
            message: `User '${username}' registered successfully`,
            user
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// Add movie review
app.post('/reviews', async (req, res) => {
    const { viewerId, stars, reviewText, movieId } = req.body;
    if (!viewerId || !stars || !reviewText || !movieId) {
        return res.status(400).json({ error: 'All review fields are required' });
    }
    if (isNaN(stars) || stars < 1 || stars > 5) {
        return res.status(400).json({ error: 'Stars must be a number between 1 and 5' });
    }
    try {
        const movieCheck = await pgPool.query("SELECT id FROM movies WHERE id = $1", [movieId]);
        if (movieCheck.rows.length === 0) {
            return res.status(404).json({ error: `Movie with ID ${movieId} not found` });
        }
        const viewerCheck = await pgPool.query("SELECT id FROM viewers WHERE id = $1", [viewerId]);
        if (viewerCheck.rows.length === 0) {
            return res.status(404).json({ error: `Viewer with ID ${viewerId} not found` });
        }
        const result = await pgPool.query(
            `INSERT INTO reviews (viewer_id, stars, review_text, movie_id)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [viewerId, stars, reviewText, movieId]
        );
        res.status(201).json({
            message: `Review added for movie ID: ${movieId} by viewer ID: ${viewerId}`,
            review: result.rows[0]
        });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Failed to add review' });
    }
});
// Get all movies 
app.get('/movies', async (req, res) => {
    try {
        const result = await pgPool.query('SELECT * FROM movies');
        res.status(200).json({
            movies: result.rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
});
// Get favorite movies by username
app.get('/favorites/:username', async (req, res) => {
    const { username } = req.params;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        const result = await pgPool.query(
            `SELECT m.* 
             FROM movies m
             JOIN favorites f ON f.movie_id = m.id
             JOIN viewers v ON f.viewer_id = v.id
             WHERE v.user_name = $1`,
            [username]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: `No favorite movies found for user '${username}'` });
        }
        res.status(200).json({ favoriteMovies: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch favorite movies' });
    }
});

// Get movie by id
app.get('/movies/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Movie ID is required' });
    }
    try {
        const result = await pgPool.query(
            `SELECT * FROM movies WHERE id = $1`,
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: `Movie with ID: ${id} not found` });
        }
        res.status(200).json({ movie: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch movie' });
    }
});

// Delete movie by id
app.delete('/movies/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pgPool.query(`DELETE FROM reviews WHERE movie_id = $1`, [id]);
        const result = await pgPool.query(`DELETE FROM movies WHERE id = $1 RETURNING *`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: `Movie with ID: ${id} not found` });
        }
        res.status(200).json({ message: `Movie with ID: ${id} deleted successfully` });
    } catch (error) {
        console.error('Error deleting movie:', error);
        res.status(500).json({ error: 'Failed to delete movie' });
    }
});