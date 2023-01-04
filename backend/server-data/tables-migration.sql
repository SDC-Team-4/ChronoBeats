DROP TABLE IF EXISTS users CASCADE;

DROP TABLE IF EXISTS albums CASCADE;

DROP TABLE IF EXISTS songs CASCADE;

DROP TABLE IF EXISTS artists CASCADE;

DROP TABLE IF EXISTS playlists CASCADE;

DROP TABLE IF EXISTS genres CASCADE;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR,
  signup_date DATE
);

CREATE TABLE albums (
  album_id SERIAL PRIMARY KEY,
  name VARCHAR,
  genre VARCHAR,
  release DATE
);

CREATE TABLE songs (
  song_id SERIAL PRIMARY KEY,
  name VARCHAR,
  genre VARCHAR,
  length INT,
  listens INT
);

CREATE TABLE artists (artist SERIAL PRIMARY KEY, name VARCHAR);

CREATE TABLE playlists (
  playlist SERIAL PRIMARY KEY,
  name VARCHAR,
  song_count INT
);

CREATE TABLE genres (genre_id SERIAL PRIMARY KEY, name VARCHAR);

COPY users(name, signup_date)
FROM
  '/tmp/server-data/users-seed.csv' DELIMITER ',' CSV;

COPY albums(name, genre, release)
FROM
  '/tmp/server-data/albums-seed.csv' DELIMITER ',' CSV;

COPY artists(name)
FROM
  '/tmp/server-data/artists-seed.csv' DELIMITER ',' CSV;

COPY playlists(name, song_count)
FROM
  '/tmp/server-data/playlists-seed.csv' DELIMITER ',' CSV;

COPY genres(name)
FROM
  '/tmp/server-data/genres-seed.csv' DELIMITER ',' CSV;

COPY songs(name, genre, length, listens)
FROM
  '/tmp/server-data/songs-seed.csv' DELIMITER ',' CSV;