const express = require('express');
const fs = require('fs');
const app = express();

const path = require('path');


app.use(express.json());
app.use(express.static('public'));

// Définir le chemin du fichier JSON
const jsonFilePath = path.join(__dirname, 'responses.json');

app.get('/responses', (req, res) => {
    // Charger les réponses depuis le fichier JSON
    const responses = require('./responses.json'); // Assurez-vous que responses.json contient vos réponses

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

// Définir le dossier contenant les fichiers statiques (comme index.html)
app.use(express.static(path.join(__dirname, '/')));

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/results', (req, res) => {
    res.sendFile(path.join(__dirname, 'results.html'));
});

// Écouter le serveur sur le port 3000 (ou le port spécifié dans l'environnement)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
