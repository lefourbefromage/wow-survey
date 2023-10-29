const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json());

// Configuration de la route pour gérer les soumissions de formulaire
app.post('/submit', (req, res) => {
    const formData = req.body;

    // Faites quelque chose avec les données, par exemple, enregistrez-les dans un fichier JSON
    const jsonData = fs.readFileSync('responses.json', 'utf8');
    const responses = JSON.parse(jsonData);
    responses.push(formData);
    fs.writeFileSync('responses.json', JSON.stringify(responses, null, 2), 'utf8');

    // Répondez avec un message de succès ou toute autre réponse appropriée
    res.status(200).json({ message: 'Formulaire soumis avec succès!' });
});

// Configuration pour servir les fichiers statiques (comme index.html et results.html)
app.use(express.static(path.join(__dirname, '/')));

// ... (autres configurations et routes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});