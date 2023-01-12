import http from 'k6/http';

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionResuse: false,
  stages: [
    { duration: '5m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5. mintures
    { duration: '10m', target: 100 }, // stay at 100 users for 10 mintues
    { duration: '5s', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duartion: ['p(99)<150'], //99% of request must complete below 150ms
  },
};

const base = 'http://host.docker.internal:8000/';

export default () => {
  let response = http.get(base);
  sleep(1);
};

/* Load testing is primarily concerned with assessing the current performance of your system
 in terms of concurrent users or request per second
 when you want to understand if your system is meeting the performance goal this is a type of test you’ll run


 Run a low test to:
  -Assess the current performance of your system under typical and peak load
  -Make sure you are continuously meeting the performance standards as you change to your system

  can be used to stimulate a normal day in your business
*/
