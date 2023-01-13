import http from 'k6/http';

export default () => {
  http.batch([
    ['GET', `${base}/users/name/Judy/3`],
    ['GET', `${base}/songs/name/Christmas/5`],
    ['GET', `${base}/genres/name/Country/2`],
    ['GET', `${base}/songs/popular/10`],
  ]);
};
