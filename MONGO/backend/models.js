const mongoose = require('mongoose');

/*
========== Collection Design ==========

users:
  id, name, signup

albums:
  name, genre, release

songs:
  name, genre, length, listens

artists:
  name

playlists:
  name, count

genres:
  name

*/

const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  signup: {
    type: Date,
    required: true,
  },
});

const User = mongoose.model('User', UserSchema);

const AlbumSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  release: {
    type: Date,
    required: true,
  },
});

const Album = mongoose.model('Album', AlbumSchema);

const SongSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  lsitens: {
    type: Number,
    required: true,
  },
});

const Song = mongoose.model('Song', SongSchema);

const ArtistSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Artist = mongoose.model('Artist', ArtistSchema);

const PlaylistSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const Playlist = mongoose.model('Playlist', PlaylistSchema);

const GenreSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Genre = mongoose.model('Genre', GenreSchema);

module.exports = { User, Genre, Playlist, Album, Artist, Song };
