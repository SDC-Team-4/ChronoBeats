import { sleep } from 'k6';
import http from 'k6/http';

export const options = {
  ext: {
    loadimpact: {
      distribution: {
        'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 50 },
        'amazon:us:columbus': { loadZone: 'amazon:us:columbus', percent: 50 },
      },
      apm: [],
    },
  },
  thresholds: {},
  scenarios: {
    End: {
      executor: 'ramping-vus',
      gracefulStop: '2s',
      stages: [
        { target: 5, duration: '2s' },
        { target: 1000, duration: '30s' },
        { target: 5, duration: '2s' },
      ],
      gracefulRampDown: '2s',
      exec: 'end',
    },
  },
};

export function end() {
  http.get('http://host.docker.internal:8000/');
  sleep(1);
  http.get('http://host.docker.internal:8000/songs/name/christmas/5');
  sleep(1);
  http.get('http://host.docker.internal:8000/genres/name/country/2');
  sleep(1);
  http.get('http://host.docker.internal:8000/songs/popular/10');
  sleep(1);
}

// let URLs = [
//   `http://host.docker.internal:8000/users/name/${term}/${count}`,
//   `http://host.docker.internal:8000/users/newest/${count}`,
//   `http://host.docker.internal:8000/users/id/${id}`,
//   `http://host.docker.internal:8000/artists/name/${term}/${count}`,
//   `http://host.docker.internal:8000/artists/id/${id}`,
//   `http://host.docker.internal:8000/albums/name/${song}/${count}`,
//   `http://host.docker.internal:8000/ablums/newest/${count}`,
//   `http://host.docker.internal:8000/albums/genre/${genre}`,
//   `http://host.docker.internal:8000/albums/id/${id}`,
//   `http://host.docker.internal:8000/songs/name/${song}/${count}`,
//   `http://host.docker.internal:8000/songs/popular/${count}`,
//   `http://host.docker.internal:8000/songs/genre/${genre}`,
//   `http://host.docker.internal:8000/songs/id/${id}`,
//   `http://host.docker.internal:8000/genres/name/${genre}/:count`,
//   `http://host.docker.internal:8000/genres/id/${id}`,
//   `http://host.docker.internal:8000/playlists/user/${id}`,
//   `http://host.docker.internal:8000/playlists/id/${id}`,
// ];
