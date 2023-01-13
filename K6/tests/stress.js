import http from 'k6/http';

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionResuse: false,
  stages: [
    { duration: '20s', target: 100 }, // below normal load
    { duration: '50s', target: 100 },
    { duration: '20s', target: 200 }, //  normal load
    { duration: '50s', target: 200 },
    { duration: '20s', target: 300 }, // around the breaking point
    { duration: '50s', target: 300 },
    { duration: '20s', target: 400 }, // beyond the breaking point
    { duration: '50s', target: 400 },
    { duration: '10s', target: 0 }, // scale down, Recovery stage.
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

stress testing is a type of load testing used to determine the limits of the system. 
The purpose of this test is to verifty the stabilily and reliability of the system under extreme conditions


Run a stress test to :
-Determine how your system will behave under extreme conditions 
-Determine whats is the maximun capacity of your system in terms of the user or thoughput 
-Determine the breaking point of your system and its failure mode 
-Determine if your system will recover without manual intervention after the stress test is over 

more of load test than spike 

*/
