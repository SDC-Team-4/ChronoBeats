import http from 'k6/http';

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionResuse: false,
  stages: [
    { duration: '10s', target: 100 }, // below normal load
    { duration: '1m', target: 100 },
    { duration: '10s', target: 1400 }, // spike to 1400 users
    { duration: '1m', target: 1400 }, // stay at 1400 for 3 minutes
    { duration: '10s', target: 100 }, // scale down. Recovery stage
    { duration: '1m', target: 100 },
    { duration: '10s', target: 0 },
  ],
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

/*
spike test is a varation of a stress test, but it does not gradually increase the load,
 instead as spikes to extreme load over a very short window of time.
 
 Run a stress test to:
 - determine how your system will perform under a sudden surge of traffic
 - determine if your sister will recover once the traffic has subsided.
 
 Success is based on expectation. System will generally react in one of four ways.
 - Excellent: system performance is not degraded during the surge of traffic.
  Response time is similar during low traffic and high traffic
 - Good: Respond time is slower, but the system does not proceed any errors
  All request are handled.
 - Poor: system proceed errors during the surge of traffic, but recovered to normal after the traffic subsided
 - Bad: System crashes, and it’s not recover after the traffic has subsided. 

*/
