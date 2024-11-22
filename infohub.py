import requests
from bs4 import BeautifulSoup
import json

# URL de la page à récupérer
url = "https://ensia-hub.netlify.app/"

# Récupérer le contenu de la page
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

# Fonction pour extraire les modules et leurs liens Google Drive
def extract_modules():
    result = {
        "Licence 1ère année informatique": {
            "Semester 1": [],
            "Semester 2": []
        },
        "Licence 2ème année informatique": {
            "Semester 1": [],
            "Semester 2": []
        },
        "Licence 3ème année informatique": {
            "Semester 1": [],
            "Semester 2": []
        }
    }

    # Extraire toutes les sections qui contiennent des modules
    sections = soup.find_all('section', class_='page')  # Ajuster en fonction de la structure exacte de la page
    if not sections:
        print("Aucune section trouvée sur la page.")
        return result

    # Associer les modules à chaque année et semestre
    for year_index, section in enumerate(sections):
        # Identifie l'année (1ère, 2ème, 3ème)
        year_name = ""
        if year_index == 0:
            year_name = "Licence 1ère année informatique"
        elif year_index == 1:
            year_name = "Licence 2ème année informatique"
        elif year_index == 2:
            year_name = "Licence 3ème année informatique"
        
        # Extraire les semestres
        semesters = section.find_all("div", class_="cardContentButtom")  # Div contenant les modules pour chaque semestre
        for semester_index, semester in enumerate(semesters):
            semester_name = "Semester 1" if semester_index == 0 else "Semester 2"
            
            # Extraire les modules (liens et noms)
            modules = semester.find_all("li", class_="module")  # Modules listés dans les 'li'
            for module in modules:
                # Rechercher les noms des modules et les liens associés
                module_name = module.get_text(strip=True)
                module_link = module.find("a")["href"] if module.find("a") else "Pas de lien disponible"
                
                # Ajouter les données au résultat pour chaque année et semestre
                result[year_name][semester_name].append({
                    "name": module_name,
                    "link": module_link
                })

    return result

# Récupérer les données des modules
modules_data = extract_modules()

# Sauvegarder les données dans un fichier JSON
with open('modules_data_ensia.json', 'w', encoding='utf-8') as json_file:
    json.dump(modules_data, json_file, ensure_ascii=False, indent=4)

print("Les données ont été enregistrées dans 'modules_data.json'.")
