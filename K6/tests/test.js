import http from 'k6/http';

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionResuse: false,
  stages: [
    // below normal load
    { duration: '20s', target: 1000 },
    { duration: '40s', target: 1000 },
    { duration: '20s', target: 0 },
  ],
};

const base = 'http://host.docker.internal:8000';

export default () => {
  http.batch([['GET', `${base}/simple`]]);
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
