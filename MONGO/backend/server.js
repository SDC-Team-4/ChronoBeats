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

/* ===== Collection Design =====
  Users:
   userID, name, userName, signup, propic
  Gernes:
   genreID, name
  Artists:
   artistID, name, portrait
  Albums:
   albumID, name, release, art, genre, artist
  Songs:
   songID, name, length, listens, album, artist, genre
  Playlists:
   playlistID, userID, songs, image
*/

// ===== Search Tables in various ways

// Users =====

app.get('/users/name/:term/:count', (req, res) => {
  User.find({ name: new RegExp(req.params.term, 'i') })
    .limit(req.params.count ? req.params.count : 50)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/users/newest/:count', (req, res) => {
  User.find()
    .sort({ signup: -1 })
    .limit(req.params.count ? req.params.count : 50)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/users/id/:id', (req, res) => {
  User.find({ userID: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(404).send(err));
});

// Artist =====

app.get('/artists/name/:term/:count', (req, res) => {
  Artist.find({ name: new RegExp(req.params.term, 'i') })
    .limit(req.params.count ? req.params.count : 50)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/artist/id/:id', (req, res) => {
  Artist.find({ artistID: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(404).send(err));
});

// Album =====

app.get('/albums/name/:term/:count', (req, res) => {
  Album.find({ name: new RegExp(req.params.term, 'i') })
    .limit(req.params.count ? req.params.count : 50)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/ablums/newest/:count', (req, res) => {
  Album.find()
    .sort({ release: -1 })
    .limit(req.params.count ? req.params.count : 50)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/albums/genre/:genre/', (req, res) => {
  Album.find({ genre: req.params.genre })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/albums/artist/:artist/', (req, res) => {
  Album.find({ artist: req.params.artist })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/albums/id/:id', (req, res) => {
  Album.find({ albumID: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(404).send(err));
});

// Song =====

app.get('/songs/name/:term/:count', (req, res) => {
  Song.find({ name: new RegExp(req.params.term, 'i') })
    .limit(req.params.count ? req.params.count : 50)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/songs/popular/:count', (req, res) => {
  Song.find()
    .sort({ listens: -1 })
    .limit(req.params.count ? req.params.count : 50)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/songs/album/:album/', (req, res) => {
  Song.find({ album: req.params.album })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/songs/artist/:artist/', (req, res) => {
  Song.find({ artist: req.params.artist })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/songs/genre/:genre/', (req, res) => {
  Song.find({ genre: req.params.genre })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/songs/id/:id', (req, res) => {
  Song.find({ albumID: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(404).send(err));
});

// Genre =====

app.get('/genres/name/:term/:count', (req, res) => {
  Genre.find({ name: new RegExp(req.params.term, 'i') })
    .limit(req.params.count ? req.params.count : 50)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/genres/id/:id', (req, res) => {
  Genre.find({ genreID: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(404).send(err));
});

// Playlist ======

app.get('/playlists/user/:userID/', (req, res) => {
  Playlist.find({ userID: req.params.userID })
    .limit(req.params.count ? req.params.count : 50)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/playlists/id/:id', (req, res) => {
  Playlist.find({ playlistID: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(404).send(err));
});

// ==================== Listener ====================

app.listen(port, () => console.log(`Listening on port ${port}`));
