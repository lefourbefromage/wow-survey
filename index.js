const express = require('express');
const serverless = require("serverless-http");
const bodyParser = require('body-parser');
const path = require('path'); // Import the path module

const port = process.env.port || 3000;

const fs = require('fs');
const api = express();
const router = express.Router();

api.use(bodyParser.json());
api.use(express.static('public'));

api.get("/hello", (req, res) => res.send("Hello World!"));

api.post('/submit', (req, res) => {
  const characterData = req.body;

  try {
    let jsonData = fs.readFileSync('data.json', 'utf8');
    jsonData = jsonData ? JSON.parse(jsonData) : { characters: [] };

    jsonData.characters.push(characterData);

    fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 2));

    res.status(200).json({ message: 'Form submitted successfully!', data: characterData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error submitting the form. Please try again later.' });
  }
});

api.get('/characters', (req, res) => {
  try {
    let jsonData = fs.readFileSync('data.json', 'utf8');
    jsonData = jsonData ? JSON.parse(jsonData) : { characters: [] };
    res.status(200).json(jsonData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data. Please try again later.' });
  }
});

api.get('/results', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'results.html')); // Serve results.html for /results route
});

api.listen(port, () => {
console.log(`Server is running on port ${PORT}`);
});


exports.handler = serverless(api);