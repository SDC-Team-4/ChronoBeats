/* ==================== Dependencies ==================== */

const cors = require('cors');
const express = require('express');
const { Pool } = require('pg');

/* ==================== Initialize Pool ==================== */

const pool = new Pool({ connectionString: process.env.connectionString });
const port = process.env.PORT;

/* ==================== Initialize Express ==================== */

const app = express();

/* ==================== Middleware ==================== */

app.use(cors());
app.use(express.json());

/* ==================== Routes ==================== */

// Returns 'count' values from each specified table

app.get('/users/:count', (req, res) => {
  pool
    .query(`SELECT * FROM users LIMIT ${req.params.count}`)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
});

app.get('/albums/:count', (req, res) => {
  pool
    .query(`SELECT * FROM albums LIMIT ${req.params.count}`)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
});

app.get('/songs/:count', (req, res) => {
  pool
    .query(`SELECT * FROM songs LIMIT ${req.params.count}`)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
});

app.get('/artists/:count', (req, res) => {
  pool
    .query(`SELECT * FROM artists LIMIT ${req.params.count}`)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
});

app.get('/playlists/:count', (req, res) => {
  pool
    .query(`SELECT * FROM playlists LIMIT ${req.params.count}`)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
});

app.get('/genres/:count', (req, res) => {
  pool
    .query(`SELECT * FROM genres LIMIT ${req.params.count}`)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
});

// Search routes: returns from specified table where any name matches search term

app.get('/search/:table/:term', (req, res) => {
  pool
    .query(`SELECT * FROM ${req.params.table} WHERE name LIKE '${req.params.term}%'`)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
});

// Return from specified table the entry with specified id.

app.get('/users/:id', (req, res) => {
  pool
    .query(`SELECT * FROM users WHERE user_id=${req.params.id}`)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
});

app.get('/albums/:id', (req, res) => {
  pool
    .query(`SELECT * FROM albums WHERE album_id=${req.params.id}`)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
});

app.get('/songs/:id', (req, res) => {
  pool
    .query(`SELECT * FROM songs WHERE song_id=${req.params.id}`)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
});

app.get('/artists/:id', (req, res) => {
  pool
    .query(`SELECT * FROM artists WHERE artist_id=${req.params.id}`)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
});

app.get('/playlists/:id', (req, res) => {
  pool
    .query(`SELECT * FROM playlists WHERE playlist_id=${req.params.id}`)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
});

app.get('/genres/:id', (req, res) => {
  pool
    .query(`SELECT * FROM genres WHERE genre_id=${req.params.id}`)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
});

// Create new data
function genInsert(obj) {
  let string = '';
  let keys = Object.keys(obj);
  let vals = Object.values(obj);
  string += '(' + keys.join(',') + ') VALUES (' + vals.join(',') + ')';
  return string;
}

app.post('/:table', (req, res) => {
  let insert = genInsert(req.body);
  pool
    .query(`INSERT INTO ${req.params.table} ${insert} RETURNING *`)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
});

// Updates data
app.put('/:table/:id', (req, res) => {
  let id = req.params.table.slice(0, req.params.table.length) + '_id';
  pool
    .query(
      `UPDATE ${req.params.table} SET ${Object.keys(req.body)[0]}=${Object.values(req.body)[0]} WHERE ${id}=${
        req.params.id
      } RETURNING *`
    )
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
});

// Deletes data
app.delete('/:table/:id', (req, res) => {
  let id = req.params.table.slice(0, req.params.table.length) + '_id';
  pool
    .query(`DELETE FROM ${req.params.table} WHERE ${id}=${req.params.id} RETURNING *`)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
});

/* ==================== Listener ==================== */

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
