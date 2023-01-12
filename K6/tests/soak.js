/*
Soak testing is used to validate reliability of the system over in a long time


Run a soap test to:
-verify your system. Doesn’t suffer from bugs or memory leaks, which is result in a crash or we start after.
-Verify that expected applications restart don’t lose request.
-Find bugs related to race conditions that appear sporadically. 
-Make sure your database doesn’t exhaust the allotted storage space and stops.
- Make sure your logs doesn’t exhaust allotted disk storage.
- Make sure the external service you depend on doesn’t stop working after a certain amount of request or executed.

How to run a soak test:
-Determine the maximum amount of users your system can handle.
- Get the 75–80% of that value
-Set VUs to that value
- Run the test in 3 stages. ramp up the VUs,  stay there for 4–12 hours, rump down to 0 

*/

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionResuse: false,
  stages: [
    { duration: '10s', target: 100 }, // ramp up to 400 users
    { duration: '1m', target: 100 }, // stay at 400 for 4 hours
    { duration: '10s', target: 1400 }, // scale down. (optional)
  ],
};

const base = 'http://host.docker.internal:8000/';

export default () => {
  http.batch([
    ['GET', `${base}/`],
    ['GET', `${base}/songs/name/christmas/5`],
    ['GET', `${base}/genres/name/country/2`],
    ['GET', `${base}/songs/popular/10`],
  ]);
};
