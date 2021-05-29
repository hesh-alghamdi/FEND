const dotenv = require('dotenv');
dotenv.config();

const port = 8080;

var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const mockAPIResponse = require('./mockAPI.js');

// Start up an instance of app
const app = express();

// Cors allows the browser and server to communicate without any security interruptions
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'));

console.log(__dirname);

// API
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?lang=en&';
const apiKey = process.env.API_KEY;
console.log(`Your API Key is ${process.env.API_KEY}`);
let userInput = []; // const does not work

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
});

app.get('/test', function (req, res) {
  res.send(mockAPIResponse);
});

app.post('/api', async (req, res) => {
  const urlInput = req.body.url;

  const result = await fetch(`${baseURL}key=${apiKey}&url=${urlInput}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(`Agreement: ${data.agreement}`);
      console.log(`Subjectivity: ${data.subjectivity}`);
      console.log(`Confidence Rate: ${data.confidence}`);
      console.log(`Score tag: ${data.score_tag}`);
      res.send(data);
    });
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
