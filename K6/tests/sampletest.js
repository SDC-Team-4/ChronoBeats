import http from 'k6/http';

// Some simple options, allows for security bybass on local host, set VU count, and duration.

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  vus: 1,
  duration: '10s',
};

// This is the address to other internal docker containers on this port
const base = 'http://host.docker.internal:8000/';

// Every VU uses the below function every time.
export default () => {
  http.get(base);
};
