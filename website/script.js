// Charger les données du fichier JSON
fetch('modules.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Réseau incorrect');
    }
    return response.json();  // Convertir la réponse en JSON
  })
  .then(data => {
    // Générer l'affichage des universités et de leurs programmes
    generatePrograms(data);
  })
  .catch(error => {
    console.error("Erreur lors du chargement du fichier JSON : ", error);
    // Afficher un message à l'utilisateur si le chargement échoue
    const container = document.getElementById('university-programs');
    container.innerHTML = '<p>Impossible de charger les données. Veuillez réessayer plus tard.</p>';
  });

// Fonction pour générer les programmes à partir des données JSON
function generatePrograms(data) {
  const container = document.getElementById('university-programs');
  const fragment = document.createDocumentFragment();  // DocumentFragment pour optimiser les performances
  
  // Boucler sur les universités
  data.universities.forEach(university => {
    const universityBlock = document.createElement('div');
    universityBlock.classList.add('university');
    
    const universityTitle = document.createElement('h3');
    universityTitle.textContent = university.name;
    universityBlock.appendChild(universityTitle);

    // Boucler sur les programmes de l'université
    university.programs.forEach(program => {
      const programBlock = document.createElement('div');
      programBlock.classList.add('program');

      const programTitle = document.createElement('h4');
      programTitle.textContent = program.name;
      programBlock.appendChild(programTitle);

      // Créer un conteneur pour les semestres
      const yearBlock = document.createElement('div');
      yearBlock.classList.add('year');
      
      // Boucler sur les semestres du programme
      program.semesters.forEach(semester => {
        const semesterBlock = document.createElement('div');
        semesterBlock.classList.add('semester');

        const semesterTitle = document.createElement('h5');
        semesterTitle.textContent = semester.semester;
        semesterBlock.appendChild(semesterTitle);

        // Boucler sur les modules de chaque semestre
        semester.modules.forEach(module => {
          // Créer un bloc pour chaque module
          const moduleBlock = document.createElement('div');
          moduleBlock.classList.add('module');

          const moduleLink = document.createElement('a');
          moduleLink.href = module.link;
          moduleLink.target = '_blank';
          moduleLink.textContent = module.name;
          moduleBlock.appendChild(moduleLink);

          // Ajouter le module au semestre
          semesterBlock.appendChild(moduleBlock);
        });

        // Ajouter chaque semestre au conteneur des semestres
        yearBlock.appendChild(semesterBlock);
      });

      // Ajouter le conteneur des semestres au programme
      programBlock.appendChild(yearBlock);

      // Ajouter le programme à l'université
      universityBlock.appendChild(programBlock);
    });

    // Ajouter l'université au conteneur global
    fragment.appendChild(universityBlock);
  });

  // Ajouter l'ensemble du fragment au DOM
  container.appendChild(fragment);
}

const moduleData = [
  { name: "Analyse 1" },
  { name: "Algorithmique et Structures de données 1" },
  { name: "Algèbre 1" },
  { name: "Structure machine 1" },
  { name: "Terminologie scientifique" },
  { name: "Composants" },
  { name: "Anglais 1" },
  { name: "Analyse 2" },
  { name: "Algorithmique et Structures de données 2" },
  { name: "Algèbre 2" },
  { name: "Structure machine 2" },
  { name: "Probabilité et statistique" },
  { name: "Physique" },
  { name: "Outils de programmation pour les mathématiques" },
  { name: "Technologies de l'information et de la communication" }
];

// Cibler l'élément select
const selectElement = document.getElementById('Module');

// Ajouter une option vide ou par défaut (si nécessaire)
const defaultOption = document.createElement('option');
defaultOption.text = 'Sélectionnez un module';
selectElement.add(defaultOption);

// Générer dynamiquement les options à partir du tableau
moduleData.forEach(module => {
  const option = document.createElement('option');
  option.value = module.name;  
  option.text = module.name;   
  selectElement.add(option);
});