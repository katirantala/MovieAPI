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

});

// Add movie review
app.post('/reviews', (req, res) => {

});

// Add favorite movies for user
app.post('/favorites', (req, res) => {

});

// Get all movies
app.get('/movies', (req, res) => {

});

// Get movies by keyword
app.get('/movies/search', (req, res) => {

});

// Get favorite movies by username
app.get('/favorites/:username', (req, res) => {
    const { username } = req.params;

});
// Get movie by id
app.get('/movies/:id', (req, res) => {
    const { id } = req.params;
});

// Delete movie by id
app.delete('/movies/:id', (req, res) => {
    const { id } = req.params;

});
