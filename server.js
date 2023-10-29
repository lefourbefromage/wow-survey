const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

// Définir le chemin du fichier JSON
const jsonFilePath = path.join(__dirname, 'responses.json');

// Endpoint pour obtenir les réponses en tant qu'objet JSON
app.get('/responses', (req, res) => {
    try {
        const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
        const responses = JSON.parse(jsonData);
        res.json(responses);
    } catch (error) {
        console.error('Erreur lors de la lecture du fichier JSON :', error.message);
        res.status(500).json({ error: 'Erreur lors de la lecture des réponses.' });
    }
});

// Endpoint pour soumettre un formulaire
app.post('/submit', (req, res) => {
    try {
        const formData = req.body;
        // Faites quelque chose avec les données, par exemple, enregistrez-les dans le fichier JSON
        // Enregistrez la nouvelle réponse dans le fichier JSON
        const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
        const responses = JSON.parse(jsonData);
        responses.push(formData);
        fs.writeFileSync(jsonFilePath, JSON.stringify(responses, null, 2), 'utf8');
        res.status(200).json({ message: 'Formulaire soumis avec succès!' });
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de la réponse :', error.message);
        res.status(500).json({ error: 'Erreur lors de l\'enregistrement de la réponse.' });
    }
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
