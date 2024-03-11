const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors') 

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); 

// Route to get all movies
app.get('/movies', (req, res) => {
    fs.readFile(path.join(__dirname, 'movies.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading movie data');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.get('/username', (req, res) => {
        const returnObject = {username: "elad"};
        res.json(returnObject);
});

// Route to add a new movie
app.post('/movies', (req, res) => {
    const newMovie = req.body;

    fs.readFile(path.join(__dirname, 'movies.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading movie data');
        }
        const movies = JSON.parse(data);
        movies.push(newMovie);

        fs.writeFile(path.join(__dirname, 'movies.json'), JSON.stringify(movies, null, 2), err => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error saving movie data');
            }
            res.status(201).send('Movie added');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
