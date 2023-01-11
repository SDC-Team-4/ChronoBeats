const mongoose = require('mongoose');

/*
========== Collection Design ==========


  Users:
   'userID,name,userName,signup,propic\n';

  Gernes:
   'genreID,name\n';

  Artists:
   'artistID,name,portrait\n';

  Albums:
   'albumID,name,release,art,genre,artist\n';

  Songs:
   'songID,name,length,listens,album,artist,genre\n';
  
  Playlists:
   'playlistID,userID,songs,image\n';

*/

const UserSchema = new mongoose.Schema({
  userID: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  signup: {
    type: Date,
    required: true,
  },
  propic: {
    type: String,
    required: false,
  },
});

const User = mongoose.model('User', UserSchema);

const AlbumSchema = new mongoose.Schema({
  albumID: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  release: {
    type: Date,
    required: true,
  },
  art: {
    type: String,
    required: false,
  },
  genre: {
    type: String,
    required: true,
  },
  artist: {
    type: Date,
    required: true,
  },
});

const Album = mongoose.model('Album', AlbumSchema);

const SongSchema = new mongoose.Schema({
  songID: {
    type: Number,
    required: true,
  },
  name: {
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
  album: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
});

const Song = mongoose.model('Song', SongSchema);

const ArtistSchema = new mongoose.Schema({
  artistID: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  portrait: {
    type: String,
    required: false,
  },
});

const Artist = mongoose.model('Artist', ArtistSchema);

const PlaylistSchema = new mongoose.Schema({
  playlistID: {
    type: Number,
    required: true,
  },
  userID: {
    type: Number,
    required: true,
  },
  songs: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Playlist = mongoose.model('Playlist', PlaylistSchema);

const GenreSchema = new mongoose.Schema({
  genreID: {
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
