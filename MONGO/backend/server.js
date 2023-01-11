// ==================== Dependencies ====================

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const { User, Genre, Playlist, Album, Artist, Song } = require('./models.js');

// ==================== Initialize Express ====================

const app = express();

// ==================== Initialize Mongoose ====================

const port = process.env.PORT;
const connectionString = process.env.connectionString;
mongoose.connect(connectionString);

// ==================== Middleware ====================

app.use(cors());
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// ==================== Routes  ====================

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to ChronoBeats' });
});

app.get('/users/:count', (req, res) => {
  User.find()
    .limit(req.params.count)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/users/search/:term', (req, res) => {
  User.find({ $text: { $search: req.params.term } }, { score: { $meta: 'textScore' } })
    .sort({ score: { $meta: 'textScore' } })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(404).send(err));
});

// ==================== Listener ====================

app.listen(port, () => console.log(`Listening on port ${port}`));
