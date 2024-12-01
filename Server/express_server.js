import express from 'express';

var app = express(); 

// Middleware
app.use(express.json());

// Server
app.listen(3001, () => {
    console.log('The server is running')
});

// ENDPOINTS

// Add genre
app.post('/genres', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Genre name is required' });
    }

    // Lisää genren logiikka tähän 
    res.status(201).json({ message: `Genre '${name}' added successfully` });
});


// Add movie 
app.post('/movies', (req, res) => {
    const { name, year, genre } = req.body;
    if (!name || !year || !genre) {
        return res.status(400).json({ error: 'Name, year, and genre are required' });
    }

    // Lisää elokuvan logiikka tähän
    res.status(201).json({ message: `Movie '${name}' added successfully` });
});


// Add registering user
app.post('/users', (req, res) => {
    const { name, username, password, yearOfBirth } = req.body;

    if (!name || !username || !password || !yearOfBirth) {
        return res.status(400).json({ error: 'All user fields are required' });
    }

      // Lisää käyttäjän rekisteröinnin logiikka tähän
    res.status(201).json({ message: `User '${username}' registered successfully` });
    });


// Add movie review
app.post('/reviews', (req, res) => {
    const { username, stars, reviewText, movieId } = req.body;

    if (!username || !stars || !reviewText || !movieId) {
        return res.status(400).json({ error: 'All review fields are required' });
    }

    // Lisää arvostelun logiikka tähän
    res.status(201).json({ message: `Review added for movie ID: ${movieId}` });
});

// Add favorite movies for user
app.post('/favorites', (req, res) => {
    const { username, movieId } = req.body;

    if (!username || !movieId) {
        return res.status(400).json({ error: 'Username and movie ID are required' });
    }

    // Lisää suosikkielokuvan logiikka tähän
    res.status(201).json({ message: `Movie ID: ${movieId} added to ${username}'s favorites` });
});

// Get all movies
app.get('/movies', (req, res) => {
    // Hae kaikki elokuvat logiikka tähän
    res.status(200).json({ message: 'All movies fetched' });
});


// Get movies by keyword
app.get('/movies/search', (req, res) => {
    const { keyword } = req.query;

    if (!keyword) {
        return res.status(400).json({ error: 'Keyword is required' });
    }

    // Hae elokuvat avainsanan perusteella logiikka tähän
    res.status(200).json({ message: `Movies matching keyword '${keyword}' fetched` });
});


// Get favorite movies by username
app.get('/favorites/:username', (req, res) => {
    const { username } = req.params;

     // Hae käyttäjän suosikit logiikka tähän
     res.status(200).json({ message: `Favorites for user '${username}' fetched` });
    });

// Get movie by id
app.get('/movies/:id', (req, res) => {
    const { id } = req.params;

    // Hae elokuvan id perusteella logiikka tähän
    res.status(200).json({ message: `Movie with ID: ${id} fetched` });
});

// Delete movie by id
app.delete('/movies/:id', (req, res) => {
    const { id } = req.params;

    // Poista elokuvan id perusteella logiikka tähän
    res.status(200).json({ message: `Movie with ID: ${id} deleted` });
});
