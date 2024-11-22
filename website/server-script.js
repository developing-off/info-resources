
// Écouteur d'événements pour le formulaire
document.getElementById('collaborate-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Empêche la soumission par défaut

    const driveLink = document.getElementById('drive-link').value;
    const university = document.getElementById('university').value;
    const program = document.getElementById('program').value;
    const semester = document.getElementById('semester').value;

    // Données à envoyer au serveur
    const data = {
        driveLink,
        university,
        program,
        semester
    };

    // Envoi des données au backend via une requête POST
    fetch('http://localhost:3000/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert('Données envoyées avec succès !');
        console.log(data);
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi des données :', error);
        alert('Une erreur est survenue. Essayez encore.');
    });
});