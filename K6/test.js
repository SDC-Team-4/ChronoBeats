import { sleep } from 'k6';
import http from 'k6/http';

export default function () {
  http.get('http://host.docker.internal:8000/');
  sleep(1);
}
