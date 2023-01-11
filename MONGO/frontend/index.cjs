// Simple express server that gives the static files to the client when requested.

const express = require('express');
const cors = require('cors');

const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.send('Welcome to ChronoBeats');
});

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
