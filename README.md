# InfoResources

[![InfoResources](https://inforesources.vercel.app/assets/images/info-resources.jpg)](https://inforesources.vercel.app/)

**InfoResources** est une plateforme qui centralise les ressources pédagogiques pour les étudiants en informatique. Elle permet de soumettre, partager et organiser des liens vers des cours, exercices, et autres documents d'apprentissage, classés par université, programme, semestre et module.

## Fonctionnalités

- **Soumission de ressources :** Les utilisateurs peuvent facilement soumettre des liens vers des dossiers Google Drive contenant des documents académiques.
- **Validation rapide :** Une fois soumis, les liens sont ajoutés au système dans les plus brefs délais après validation.

Merci de contribuer à enrichir la plateforme et de partager ces ressources pour aider la communauté à mieux apprendre et progresser.

Accédez à la plateforme : [https://inforesources.vercel.app/](https://inforesources.vercel.app/)

## Script Python - `infohub.py`

Ce script Python est utilisé pour extraire et organiser les modules de cours à partir de la page web **ENSIA Hub** & **infohub**.

### Fonctionnalités du script :

- **Récupération des données :** Le script récupère les données depuis le site web [ENSIA Hub](https://ensia-hub.netlify.app/) & [infohub](https://infohub-o79j.vercel.app/).
- **Extraction des modules :** Le script extrait les informations sur les modules pour les 3 années de Licence en Informatique, organisées par semestre.
- **Sauvegarde en JSON :** Les données sont enregistrées dans un fichier `modules_data_ensia.json`.

### Utulisation du script

```
pip install requests beautifulsoup4
```
```
python infohub.py
```
-Cela extraira les données et les sauvegardera dans un fichier modules_data_ensia.json.

## Contribuer

Nous vous encourageons à contribuer en ajoutant vos propres ressources pédagogiques, en soumettant des liens ou en améliorant le code. Vos contributions sont essentielles pour améliorer la plateforme et aider les étudiants du monde entier.

### Comment contribuer :

1. **Ajoutez des ressources pédagogiques :** Si vous avez des liens vers des cours, exercices, ou autres documents utiles, vous pouvez les soumettre facilement via la plateforme.
   
2. **Améliorez le code :** Si vous êtes développeur, n'hésitez pas à proposer des améliorations au code, des corrections de bugs, ou de nouvelles fonctionnalités.

3. **Partagez vos idées :** Si vous avez des suggestions pour améliorer la plateforme, ouvrez une issue pour discuter de vos idées.

### Processus pour soumettre vos contributions :

1. Fork ce repository.
2. Créez une branche pour votre fonctionnalité ou correction.
3. Faites vos modifications et validez-les.
4. Ouvrez une Pull Request avec une description claire de vos modifications.

Merci de faire partie de cette initiative et de contribuer à la communauté académique !

[![InfoResources](https://inforesources.vercel.app/assets/images/info-resources.jpg)](https://inforesources.vercel.app/)