/* ==================== Dependencies ==================== */

const cors = require('cors');
const express = require('express');
const { Pool } = require('pg');
const config = require('./config.js');

/* ==================== Initialize Pool ==================== */

const pool = new Pool({ connectionString: config[process.env.MODE].connectionString });
const port = config[process.env.MODE].port;

/* ==================== Initialize Express ==================== */

const app = express();

/* ==================== Middleware ==================== */

app.use(cors());
app.use(express.json());

/* ==================== Routes ==================== */

//example: returns all values from the requested table
app.get('/:table', (req, res) => {
  pool
    .query(`SELECT * FROM ${req.params.table}`)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
});

// app.post('/:table', (req, res) => {
//   pool
//     .query(`INSERT INTO ${req.params.table}`)
//     .then((result) => res.send(result.rows))
//     .catch((err) => {
//       console.error(err);
//       res.status(404).send(err);
//     });
// });

/*
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR,
  passhash VARCHAR,
  release DATE
);

CREATE TABLE albums (
  album_id SERIAL PRIMARY KEY,
  name VARCHAR,
  release DATE,
  artist varchar
);

CREATE TABLE songs (
  song_id SERIAL PRIMARY KEY,
  name VARCHAR,
  length INT,
  album varchar
);

CREATE TABLE artists (
  artist SERIAL PRIMARY KEY,
  name VARCHAR,
  song_count INT
);

CREATE TABLE playlists (
  playlist SERIAL PRIMARY KEY,
  name VARCHAR,
  song_count INT,
  creator VARCHAR,
  songs TEXT
);*/

/* ==================== Listener ==================== */

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
