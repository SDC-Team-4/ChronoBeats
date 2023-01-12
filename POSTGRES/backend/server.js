/* ==================== Dependencies ==================== */

const cors = require('cors');
const express = require('express');
const { Pool } = require('pg');

/* ==================== Initialize Pool ==================== */

const pool = new Pool({ connectionString: process.env.connectionString });
const port = process.env.PORT;
pool.connect();

/* ==================== Initialize Express ==================== */

const app = express();

/* ==================== Middleware ==================== */

app.use(cors());
app.use(express.json());

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

// Testing =====

app.get('/', (req, res) => {
  res.send('Welcome to ChronoBeats Backend (POSTGRES)');
});

// Users =====

app.get('/users/name/:term/:count', (req, res) => {
  pool
    .query(`SELECT * FROM users WHERE name LIKE '%${req.params.term}%' LIMIT ${req.params.count}`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/users/newest/:count', (req, res) => {
  pool
    .query(`SELECT * FROM users ORDER BY signup DESC LIMIT ${req.params.count}`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/users/id/:id', (req, res) => {
  pool
    .query(`SELECT * FROM users WHERE id=${req.params.id}`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => res.status(404).send(err));
});

// Artist =====

app.get('/artists/name/:term/:count', (req, res) => {
  pool
    .query(`SELECT * FROM artists WHERE name LIKE '%${req.params.term}%' LIMIT ${req.params.count}`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/artist/id/:id', (req, res) => {
  pool
    .query(`SELECT * FROM users WHERE id=${req.params.id}`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => res.status(404).send(err));
});

// Album =====

app.get('/albums/name/:term/:count', (req, res) => {
  pool
    .query(`SELECT * FROM albums WHERE name LIKE '%${req.params.term}%' LIMIT ${req.params.count}`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/ablums/newest/:count', (req, res) => {
  pool
    .query(`SELECT * FROM albums ORDER BY release DESC LIMIT ${req.params.count}`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/albums/genre/:genre/', (req, res) => {
  pool
    .query(`SELECT * FROM albums WHERE genre='${req.params.genre}'`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/albums/artist/:artist/', (req, res) => {
  pool
    .query(`SELECT * FROM albums WHERE artist='${req.params.artist}'`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/albums/id/:id', (req, res) => {
  pool
    .query(`SELECT * FROM albums WHERE id=${req.params.id}`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => res.status(404).send(err));
});

// Song =====

app.get('/songs/name/:term/:count', (req, res) => {
  pool
    .query(`SELECT * FROM songs WHERE name LIKE '%${req.params.term}%' LIMIT ${req.params.count}`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/songs/popular/:count', (req, res) => {
  pool
    .query(`SELECT * FROM songs ORDER BY listens DESC LIMIT ${req.params.count}`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/songs/album/:album/', (req, res) => {
  pool
    .query(`SELECT * FROM songs WHERE album='${req.params.album}'`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/songs/artist/:artist/', (req, res) => {
  pool
    .query(`SELECT * FROM songs WHERE artist='${req.params.artist}'`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/songs/genre/:genre/', (req, res) => {
  pool
    .query(`SELECT * FROM songs WHERE genre='${req.params.genre}'`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/songs/id/:id', (req, res) => {
  pool
    .query(`SELECT * FROM songs WHERE id=${req.params.id}`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => res.status(404).send(err));
});

// Genre =====

app.get('/genres/name/:term/', (req, res) => {
  pool
    .query(`SELECT * FROM genres WHERE name LIKE '%${req.params.term}%'`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/genres/id/:id', (req, res) => {
  pool
    .query(`SELECT * FROM genres WHERE id=${req.params.id}`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => res.status(404).send(err));
});

// Playlist ======

app.get('/playlists/user/:userID/', (req, res) => {
  pool
    .query(`SELECT * FROM playlists WHERE user_id=${req.params.id}`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => res.status(404).send(err));
});

app.get('/playlists/id/:id', (req, res) => {
  pool
    .query(`SELECT * FROM playlists WHERE id=${req.params.id}`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => res.status(404).send(err));
});

/* ==================== Listener ==================== */

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
