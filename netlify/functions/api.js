const express = require('express');
const bodyParser = require('body-parser');
const serverless = require("serverless-http");

const path = require('path'); // Import the path module
const fs = require('fs');

const app = express();
const router = express.Router();


app.use(bodyParser.json());

router.post('/submit', (req, res) => {
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

router.get('/characters', (req, res) => {
  try {
    let jsonData = fs.readFileSync('data.json', 'utf8');
    jsonData = jsonData ? JSON.parse(jsonData) : { characters: [] };
    res.status(200).json(jsonData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data. Please try again later.' });
  }
});

router.get('/results', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'results.html')); // Serve results.html for /results route
  });

router.listen(port, () => {
console.log(`Server is running on port ${port}`);
});

    router.use("/api/", router);
  exports.handler = serverless(app);