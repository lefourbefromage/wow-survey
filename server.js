const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();


const PORT = process.env.PORT || 3000;

// Middleware pour parser les données POST en JSON
app.use(express.json());


app.use(express.static(path.join(__dirname, '/')));

app.use(bodyParser.json());


app.post('/submit', (req, res) => {
    const response = req.body;

    // Charger les anciennes réponses
    let responses = [];
    try {
        responses = JSON.parse(fs.readFileSync('responses.json'));
    } catch (error) {
        console.error(error);
    }

    // Ajouter la nouvelle réponse
    responses.push(response);

    // Enregistrer les réponses dans le fichier JSON
    fs.writeFileSync('responses.json', JSON.stringify(responses, null, 2));

    res.json({ success: true });
    res.status(200).json({ message: 'Formulaire soumis avec succès!' });
});

app.get('/responses', (req, res) => {
    // Charger les réponses depuis le fichier JSON
    let responses = [];
    try {
        responses = JSON.parse(fs.readFileSync('responses.json'));
    } catch (error) {
        console.error(error);
    }

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

app.get('/results', (req, res) => {
    res.sendFile(path.join(__dirname, 'results.html'));
});


app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});
