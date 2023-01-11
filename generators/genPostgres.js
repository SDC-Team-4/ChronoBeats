/* ==================== Dependenies ==================== */

const fs = require('fs');
const { faker } = require('@faker-js/faker');

/* ==================== Helper Functions ==================== */

const genres = [
  'Blues',
  'Classical',
  'Country',
  'Electronic',
  'Folk',
  'Hip Hop',
  'Jazz',
  'Latin',
  'Pop',
  'R&B',
  'Rock',
  'Alternative',
  'Indie',
  'Punk',
  'Grunge',
  'Metal',
  'Thrash',
  'Death',
  'Black',
  'Doom',
  'Power',
  'Progressive',
  'Symphonic',
  'Technical',
  'Rap',
  'Trap',
  'Gangsta',
  'Boom Bap',
  'Juke',
  'Footwork',
  'Jungle',
  'Drum and Bass',
  'Breakbeat',
  'Dubstep',
  'Trance',
  'Techno',
  'House',
  'Electro',
  'Disco',
  'Funk',
  'Soul',
  'R&B',
  'Hip Hop',
  'Rap',
  'Gospel',
  'Reggae',
  'Ska',
  'Rocksteady',
  'Dancehall',
  'Dub',
  'World',
  'African',
  'Arabic',
  'Chinese',
  'Indian',
  'Japanese',
  'Korean',
  'Latin',
  'Brazilian',
  'Salsa',
  'Merengue',
  'Cumbia',
  'Reggaeton',
  'Tango',
  'Flamenco',
  'Greek',
  'Irish',
  'Scottish',
  'Welsh',
  'English',
  'American',
  'Bluegrass',
  'Cajun',
  'Creole',
  'Delta Blues',
  'Zydeco',
  'Southern Rock',
  'New Orleans Jazz',
  'Chicago Blues',
  'Tex-Mex',
  'Tejano',
  'Nashville Sound',
  'Honky Tonk',
  'Outlaw Country',
  'Country-Rock',
];
function randomGenre() {
  return genres[Math.floor(Math.random() * genres.length)];
}

function genSongsList(start, end) {
  let list = [];
  for (let i = start; i < end; i++) {
    list.push(i);
  }
  return list;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/* ==================== Generate 10 Million Users ==================== */

// users ( user_id SERIAL PRIMARY KEY,
//   name VARCHAR,
//   user_name VARCHAR,
//   signup DATE,
//   propic varchar
// );

function genUsers() {
  console.log('starting users');
  for (let i = 1; i <= 10000000; i++) {
    // Use faker to make a fake name
    let firstName = faker.name.firstName();
    let name = firstName + ' ' + faker.name.lastName();
    // Generate a random username
    let userName = faker.internet.userName(firstName);
    // Use faker to make a fake date from the last 10 years, convert to string, and remove extraneous text
    let signup = faker.date
      .past(10)
      .toString()
      .replace(/\sGMT.*$/, '');
    // Use faker to make a random image link
    let propic = faker.internet.avatar();
    // Put all the data into a comma deliniated string
    let output = `${name},${userName},${signup},${propic}\n`;
    // Write the string to the file
    fs.writeFileSync('users-psql.csv', output, { flag: 'a+' });
    // Some console logs to see how far along the function is
    if (i % 100000 === 0) {
      console.log(`reached ${i / 1000000} million users`);
    }
  }
  console.log('finished users');
}

/* ==================== Generate All Genres ==================== */

// genres ( genre_id SERIAL PRIMARY KEY,
//   name VARCHAR
// );

function genGenres() {
  console.log('starting genres');
  for (let i = 0; i <= genres.length - 1; i++) {
    // Use function to generate a genre from the list
    let name = genres[i];
    // Put the data into a comma deliniated string
    let output = `${name}\n`;
    // Write the string to the file
    fs.writeFileSync('genres-psql.csv', output, { flag: 'a+' });
    // Some console logs to see how far along the function is
  }
  console.log('finished genres');
}

/* ==================== Generate 1 Million artists ==================== */

// artists ( artist_id SERIAL PRIMARY KEY,
//   name VARCHAR,
//   portrait varchar,
//   );
let artistList = [];
function genArtists() {
  console.log('starting artists');
  for (let i = 1; i <= 1000000; i++) {
    // Use faker to make a fake name
    let name = faker.name.fullName();
    // Use faker to make a random image link
    let portrait = faker.image.avatar();
    // Put all the data into a comma deliniated string
    let output = `${name},${portrait}\n`;
    // Write the string to the file
    artistList.push(name);
    fs.writeFileSync('artists-psql.csv', output, { flag: 'a+' });
    // Some console logs to see how far along the function is
    if (i % 100000 === 0) {
      console.log(`reached ${i / 1000000} million artists`);
    }
  }
  console.log('finished artists');
}

/* ==================== Generate 5 Million Albums ==================== */

// albums ( album_id SERIAL PRIMARY KEY,
//   name VARCHAR,
//   release DATE,
//   art varchar,
//   genre varchar,
//   artist varchar,
// );

let albumList = [];
function genAlbums() {
  console.log('starting albums');
  for (let i = 1; i <= 1000000; i++) {
    let name = faker.music.songName();
    let release = faker.date
      .past(10)
      .toString()
      .replace(/\sGMT.*$/, '');
    let genre = randomGenre();
    let art = faker.image.imageUrl(800, 800, undefined, true);
    let artist = artistList[i];
    let output = `${name},${release},${art},${genre},${artist}\n`;
    albumList.push([name, artist, genre]);
    fs.writeFileSync('albums-psql.csv', output, { flag: 'a+' });
    if (i === 0) {
    } else if (i % 100000 === 0) {
      console.log(`passing ${i / 1000000} million albums`);
    }
  }
  for (let i = 1; i <= 4000000; i++) {
    let name = faker.music.songName();
    let release = faker.date
      .past(10)
      .toString()
      .replace(/\sGMT.*$/, '');
    let genre = randomGenre();
    let art = faker.image.imageUrl(800, 800, undefined, true);
    let artist = artistList[Math.floor(Math.random() * artistList.length)];
    let output = `${name},${release},${art},${genre},${artist}\n`;
    albumList.push([name, artist, genre]);
    fs.writeFileSync('albums-psql.csv', output, { flag: 'a+' });
    if (i === 0) {
      console.log('starting albums');
    } else if (i % 100000 === 0) {
      console.log(`passing ${i / 1000000 + 1} million albums`);
    }
  }
  console.log('finished albums');
}

/* ==================== Generate 100 Million Songs ==================== */

// songs ( song_id SERIAL PRIMARY KEY,
//   name VARCHAR,
//   length INT,
//   listens INT,
//   album VARCHAR,
//   artist VARCHAR,
//   genre VARCHAR
// );

function genSongs() {
  console.log('starting songs');
  for (let i = 1; i <= 5000000; i++) {
    // Use faker to make a fake name
    let name = faker.music.songName();
    // Use faker to make a fake date from the last 10 years, convert to string, and remove extraneous text
    let length = faker.datatype.number({ min: 60, max: 360 });
    // Use faker to make a random image link
    let listens = faker.datatype.number({ min: 2, max: 1000000000 });
    // Give data to songs, based on albumList
    let artist = albumList[i - 1][1];
    let album = albumList[i - 1][0];
    let genre = albumList[i - 1][2];
    // Put all the data into a comma deliniated string
    let output = `${name},${length},${listens},${album},${artist},${genre}\n`;
    // Write the string to the file
    fs.writeFileSync('songs-psql.csv', output, { flag: 'a+' });
    // Some console logs to see how far along the function is
    if (i % 100000 === 0) {
      console.log(`reached ${i / 1000000} million songs`);
    }
  }
  for (let i = 1; i <= 100000000 - 5000000; i++) {
    // Use faker to make a fake name
    let name = faker.music.songName();
    // Use faker to make a fake date from the last 10 years, convert to string, and remove extraneous text
    let length = faker.datatype.number({ min: 60, max: 360 });
    // Use faker to make a random image link
    let listens = faker.datatype.number({ min: 2, max: 1000000000 });
    // Give data to songs, based on albumList
    let albumID = Math.floor(Math.random() * albumList.length);
    let artist = albumList[albumID][1];
    let album = albumList[albumID][0];
    let genre = albumList[albumID][2];
    // Put all the data into a comma deliniated string
    let output = `${name},${length},${listens},${album},${artist},${genre}\n`;
    // Write the string to the file
    fs.writeFileSync('songs-psql.csv', output, { flag: 'a+' });
    // Some console logs to see how far along the function is
    if (i % 100000 === 0) {
      console.log(`reached ${i / 1000000 + 5} million songs`);
    }
  }
  console.log('finished songs');
}

/* ==================== Generate 10 Million Playlists ==================== */

// playlists (
//   playlist SERIAL PRIMARY KEY,
//   user_id INT,
//   songs TEXT,
//   image VARCHAR
// );

function genPlaylists() {
  console.log('starting playlists');
  for (let i = 0; i < 10000000; i++) {
    let songList = [];
    for (let i = 0; i < Math.floor(Math.random() * 50); i++) {
      songList.push(Math.floor(Math.random() * 100000000));
    }
    let image = faker.image.imageUrl(800, 800, undefined, true);
    let output = `${i},${i},${songList.join('.')},${image}\n`;
    fs.writeFileSync('playlists-psql.csv', output, { flag: 'a+' });
    if (i % 100000 === 0) {
      console.log(`reached ${i / 1000000} million playlists`);
    }
  }
  console.log('finished playlists');
}

/* ==================== Call Generators ==================== */

genUsers();
genGenres();
genArtists();
genAlbums();
genSongs();
genPlaylists();
