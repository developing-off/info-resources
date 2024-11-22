const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');  // Importation du module CORS

const app = express();

// Activer CORS pour toutes les origines (ou spécifier une origine spécifique)
app.use(cors());

// Middleware pour parser le corps de la requête en JSON
app.use(bodyParser.json());

// Serveur qui gère le fichier statique HTML
app.use(express.static('public'));

// Endpoint pour recevoir et traiter les données du formulaire
app.post('/submit-form', (req, res) => {
    const { driveLink, university, program, semester } = req.body;

    // Vérifie que toutes les données nécessaires sont présentes
    if (!driveLink || !university || !program || !semester) {
        return res.status(400).json({ message: 'Données manquantes dans la requête.' });
    }

    // Structure des données à ajouter
    const data = {
        name: program,
        semesters: [
            {
                semester: semester,
                modules: [
                    {
                        name: `${program} Module for ${semester}`,
                        link: driveLink,
                        status: "pending"  // Le statut est "pending" au départ
                    }
                ]
            }
        ]
    };

    // Emplacement du fichier JSON
    const filePath = path.join(__dirname, 'universities.json');

    // Lecture du fichier JSON
    fs.readFile(filePath, 'utf8', (err, fileData) => {
        let jsonData = { universities: [] };

        // Si le fichier n'existe pas encore, on initialise le tableau
        if (err && err.code === 'ENOENT') {
            jsonData = { universities: [] };
        } else if (err) {
            return res.status(500).json({ message: 'Erreur de lecture du fichier.' });
        } else {
            jsonData = JSON.parse(fileData);
        }

        // Recherche l'université dans le fichier
        let universityFound = jsonData.universities.find(u => u.name === university);
        if (!universityFound) {
            // Si l'université n'existe pas, on la crée
            universityFound = { name: university, programs: [] };
            jsonData.universities.push(universityFound);
        }

        // Recherche le programme dans l'université
        let programFound = universityFound.programs.find(p => p.name === program);
        if (!programFound) {
            // Si le programme n'existe pas, on le crée
            programFound = { name: program, semesters: [] };
            universityFound.programs.push(programFound);
        }

        // Ajout du semestre et du module
        programFound.semesters.push(data.semesters[0]);

        // Sauvegarde les données mises à jour dans le fichier JSON
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur lors de l\'écriture dans le fichier.' });
            }

            res.status(200).json({ message: 'Données envoyées avec succès !' });
        });
    });
});

// Lancer le serveur sur le port 3000
app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});
