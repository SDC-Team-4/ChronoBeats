DROP TABLE IF EXISTS users CASCADE;

DROP TABLE IF EXISTS albums CASCADE;

DROP TABLE IF EXISTS songs CASCADE;

DROP TABLE IF EXISTS artists CASCADE;

DROP TABLE IF EXISTS playlists CASCADE;

DROP TABLE IF EXISTS genres CASCADE;

playlists let output = `${i},${i},${songList.join('.')},${image}\n`;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR,
  userName VARCHAR,
  signup DATE,
  propic VARCHAR
);

CREATE TABLE albums (
  album_id SERIAL PRIMARY KEY,
  name VARCHAR,
  release DATE,
  art VARCHAR,
  genre VARCHAR,
  artist VARCHAR
);

CREATE TABLE songs (
  song_id SERIAL PRIMARY KEY,
  name VARCHAR,
  length INT,
  listens INT,
  album VARCHAR,
  artist VARCHAR,
  genre VARCHAR
);

CREATE TABLE artists (
  artist_id SERIAL PRIMARY KEY,
  name VARCHAR,
  portrait VARCHAR
);

CREATE TABLE playlists (
  playlist_id SERIAL PRIMARY KEY,
  user_id INT,
  songs VARCHAR,
  image VARCHAR
);

CREATE TABLE genres (genre_id SERIAL PRIMARY KEY, name VARCHAR);

COPY users(name, userName, signup, propic)
FROM
  '/var/lib/postgresql/csvs/users-psql.csv' DELIMITER ',' CSV;

COPY albums(name, release, art, genre, artist)
FROM
  '/var/lib/postgresql/csvs/albums-psql.csv' DELIMITER ',' CSV;

COPY artists(name, portrait)
FROM
  '/var/lib/postgresql/csvs/artists-psql.csv' DELIMITER ',' CSV;

COPY playlists(user_id, songs, image)
FROM
  '/var/lib/postgresql/csvs/playlists-psql.csv' DELIMITER ',' CSV;

COPY genres(name)
FROM
  '/var/lib/postgresql/csvs/genres-psql.csv' DELIMITER ',' CSV;

COPY songs(name, length, listens, album, artist, genre)
FROM
  '/var/lib/postgresql/csvs/songs-psql.csv' DELIMITER ',' CSV;