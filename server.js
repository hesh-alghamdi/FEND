projectData = {};

const port = 3000;

// Express, cors and body-parser
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('website'));

app.listen(port, () => {
  console.log(`Server is runnin on ${port}`);
});

app.get('/all', (req, res) => {
  res.send(projectData);
});

app.post('/weatherData', postData);

function postData(req, res) {
  projectData.temp = req.body.temp;
  projectData.weatherDescription = req.body.weatherDescription;
  projectData.weatherIcons = req.body.weatherIcons;
  projectData.date = req.body.date;
  projectData.userFeelings = req.body.userFeelings;
  // I had to use end() or my HTML won't get processed
  res.end();
  console.log(projectData);
}
