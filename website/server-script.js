document.addEventListener("DOMContentLoaded", function () {
    // Données des modules (ajoutez ici vos modules comme précédemment)
    
    // Gestion de l'envoi du formulaire
    const form = document.getElementById("collaborate-form");
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Empêche le comportement par défaut
  
      // Récupérer les données du formulaire
      const formData = {
        driveLink: document.getElementById("drive-link").value,
        university: document.getElementById("university").value,
        program: document.getElementById("program").value,
        semester: document.getElementById("semester").value,
        module: document.getElementById("Module").value
      };
  
      // Construire la chaîne de requête GET
      const queryString = new URLSearchParams(formData).toString();
  
      // URL du serveur PHP
      const serverURL = `http://127.0.0.31/server/submit-form.php?${queryString}`;
  
      // Effectuer la requête GET
      fetch(serverURL)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur lors de la requête.");
          }
          return response.json();
        })
        .then((data) => {
          // Traiter la réponse du serveur
          if (data.success) {
            alert("Données envoyées avec succès !");
          } else {
            alert(`Erreur du serveur : ${data.message}`);
          }
        })
        .catch((error) => {
          console.error("Erreur lors de l'envoi des données :", error);
          alert("Impossible d'envoyer les données. Veuillez réessayer.");
        });
    });
  });