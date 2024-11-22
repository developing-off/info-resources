// api/submit-form.js

const fs = require('fs');
const path = require('path');

// Gestionnaire principal pour la fonction
module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Méthode non autorisée' });
        return;
    }

    const { driveLink, university, program, semester } = req.body;

    if (!driveLink || !university || !program || !semester) {
        res.status(400).json({ message: 'Données manquantes dans la requête.' });
        return;
    }

    const data = {
        name: program,
        semesters: [
            {
                semester: semester,
                modules: [
                    {
                        name: `${program} Module for ${semester}`,
                        link: driveLink,
                        status: "pending"
                    }
                ]
            }
        ]
    };

    const filePath = path.join(process.cwd(), 'universities.json');

    try {
        let jsonData = { universities: [] };

        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, 'utf8');
            jsonData = JSON.parse(fileData);
        }

        let universityFound = jsonData.universities.find(u => u.name === university);
        if (!universityFound) {
            universityFound = { name: university, programs: [] };
            jsonData.universities.push(universityFound);
        }

        let programFound = universityFound.programs.find(p => p.name === program);
        if (!programFound) {
            programFound = { name: program, semesters: [] };
            universityFound.programs.push(programFound);
        }

        programFound.semesters.push(data.semesters[0]);

        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
        res.status(200).json({ message: 'Données envoyées avec succès !' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur.', error });
    }
};
