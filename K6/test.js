import { sleep } from 'k6';
import http from 'k6/http';

export const options = {
  scenarios: {
    Spike: {
      executor: 'ramping-vus',
      gracefulStop: '5s',
      stages: [
        { target: 5, duration: '5s' },
        { target: 10, duration: '5s' },
        { target: 5, duration: '5s' },
        { target: 0, duration: '5s' },
      ],
      gracefulRampDown: '5s',
      exec: 'spike',
    },
  },
};

export function spike() {
  let response;

  response = http.get(`http://pgbackend:8000/users/name/Judy/20`);
  sleep(1);
}
