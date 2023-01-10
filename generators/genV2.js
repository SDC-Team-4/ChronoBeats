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

/* ==================== Generate Users ==================== */

// users ( user_id SERIAL PRIMARY KEY,
//   name VARCHAR,
//   user_name VARCHAR,
//   signup DATE,
//   propic varchar
// );

function genUsers(num) {
  console.log('starting users');
  for (let i = 1; i <= num; i++) {
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
    fs.writeFileSync('users-seed.csv', output, { flag: 'a+' });
    // Some console logs to see how far along the function is
    if (i % 100000 === 0) {
      console.log(`reached ${i / 1000000} million users`);
    }
  }
  console.log('finished users');
}

/* ==================== Generate Songs ==================== */

// songs ( song_id SERIAL PRIMARY KEY,
//   name VARCHAR,
//   length INT,
//   listens INT,
//   genre VARCHAR,
//   artist_id INT
// );

function genSongs(num) {
  console.log('starting songs');
  for (let i = 1; i <= num; i++) {
    // Use faker to make a fake name
    let name = faker.music.songName();
    // Use faker to make a fake date from the last 10 years, convert to string, and remove extraneous text
    let length = faker.datatype.number({ min: 60, max: 360 });
    // Use faker to make a random image link
    let listens = faker.datatype.number({ min: 2, max: 1000000000 });
    // genres boiiiii
    let genre = randomGenre();
    // Give a random artist to a song
    let artist_id = randomNumber(1, 100000);
    // Put all the data into a comma deliniated string
    let output = `${name},${length},${listens},${genre}\n`;
    // Write the string to the file
    fs.writeFileSync('songs-seed.csv', output, { flag: 'a+' });
    // Some console logs to see how far along the function is
    if (i % 100000 === 0) {
      console.log(`reached ${i / 1000000} million songs`);
    }
  }
  console.log('finished songs');
}

/* ==================== Generate Genres ==================== */

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
    fs.writeFileSync('genres-seed.csv', output, { flag: 'a+' });
    // Some console logs to see how far along the function is
  }
  console.log('finished genres');
}

/* ==================== Generate artists ==================== */

// artists ( artist_id SERIAL PRIMARY KEY,
//   name VARCHAR,
//   portrait varchar,
//   );

function genArtists(num) {
  console.log('starting artists');
  for (let i = 1; i <= num; i += 100) {
    // Use faker to make a fake name
    let name = faker.name.fullName();
    // Use faker to make a random image link
    let portrait = faker.image.avatar();
    // Put all the data into a comma deliniated string
    let output = `${name},${portrait}\n`;
    // Write the string to the file
    fs.writeFileSync('artists-seed.csv', output, { flag: 'a+' });
    // Some console logs to see how far along the function is
    if (i % 100000 === 0) {
      console.log(`reached ${i / 1000000} million artists`);
    }
  }
  console.log('finished artists');
}

/* ==================== Generate Albums ==================== */
/* ==================== NOT IMPLEMENTED ==================== */

// albums ( album_id SERIAL PRIMARY KEY,
//   name VARCHAR,
//   release DATE,
//   art varchar,
//   artist_id INT,
//   genre varchar,
//   songs text
// );

function genAlbums(num) {
  for (let i = 1; i <= num; i += 300) {
    let name = faker.music.songName();
    let release = faker.date
      .past(10)
      .toString()
      .replace(/\sGMT.*$/, '');
    let genre = faker.music.genre();
    let art = faker.image.imageUrl(800, 800, undefined, true);
    let artist_id = randomNumber(1, 100000);
    let output = `${name},${release},${art},${artist_id}\n`;
    fs.writeFileSync('albums-seed.csv', output, { flag: 'a+' });
    if (i === 0) {
      console.log('starting albums');
    } else if (i % 100000 === 0) {
      console.log(`passing ${i / 1000000} million albums`);
    }
  }
  console.log('finished albums');
}

/* ==================== Generate Playlists ==================== */
/* ==================== NOT IMPLEMENTED ==================== */

// playlists (
//   playlist SERIAL PRIMARY KEY,
//   name VARCHAR,
//   songs TEXT,
//   image VARCHAR
// );

function genPlaylists(num) {
  for (let i = 0; i < num; i++) {
    let gap = randomSize();
    let text =
      dummytext.slice(i % 40225, (i % 40225) + gap) +
      ' ' +
      dummytext.slice((i % 40225) + gap, (i % 40225) + randomSize() + gap);
    let output = `${text},${randomSongCount()}\n`;
    fs.writeFileSync('playlists-seed.csv', output, { flag: 'a+' });
    if (i === 0) {
      console.log('starting playlists');
    } else if (i % 100000 === 0) {
      console.log(`passing ${i / 1000000} million playlists`);
    }
  }
  console.log('finished playlists');
}

/* ==================== Call Generators ==================== */

let genCount = 10000000;

genUsers(genCount);
genSongs(genCount);
genGenres(genCount);
genArtists(genCount);
