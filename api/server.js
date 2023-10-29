
const { v4 } = require('uuid');

app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

module.exports = app;










const express = require('express');
const fs = require('fs');
const app = express();

const path = require('path');

app.use(express.json());

// Définir le chemin du fichier JSON
const jsonFilePath = path.join(__dirname, 'responses.json');

// Endpoint pour soumettre un formulaire
app.post('/submit', (req, res) => {
    const formData = req.body;
    // Faites quelque chose avec les données, par exemple, enregistrez-les dans le fichier JSON
    // Enregistrez la nouvelle réponse dans le fichier JSON
        const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
        const responses = JSON.parse(jsonData);
        responses.push(formData);
        fs.writeFileSync(jsonFilePath, JSON.stringify(responses, null, 2), 'utf8');
        res.status(200).json({ message: 'Formulaire soumis avec succès!' });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/results', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results.html'));
});

app.get('/responses', (req, res) => {
    // Charger les réponses depuis le fichier JSON
    const responses = require('../responses.json'); // Assurez-vous que responses.json contient vos réponses

    // Filtrer et trier les réponses par rôle et classe
    let sortedResponses = {
        tank: [],
        heal: [],
        'dps-distance': [],
        'dps-cac': []
    };

    responses.forEach(response => {
        sortedResponses[response.role].push(response);
    });

    res.json(sortedResponses);
});

module.exports = app;
