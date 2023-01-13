import http from 'k6/http';

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionResuse: false,
  stages: [
    { duration: '50s', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5. mintures
    { duration: '4m', target: 100 }, // stay at 100 users for 10 mintues
    { duration: '10s', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(99)<1000'], //99% of request must complete below 1000ms
  },
};

const base = 'http://host.docker.internal:8000';

export default () => {
  http.batch([
    ['GET', `${base}/users/name/Judy/3`],
    ['GET', `${base}/songs/name/Christmas/5`],
    ['GET', `${base}/genres/name/Country/2`],
    ['GET', `${base}/songs/popular/10`],
  ]);
};

/* Load testing is primarily concerned with assessing the current performance of your system
 in terms of concurrent users or request per second
 when you want to understand if your system is meeting the performance goal this is a type of test you’ll run


 Run a low test to:
  -Assess the current performance of your system under typical and peak load
  -Make sure you are continuously meeting the performance standards as you change to your system

  can be used to stimulate a normal day in your business
*/
