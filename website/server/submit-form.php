<?php
header('Content-Type: application/json');

// Vérifiez si tous les paramètres nécessaires sont présents
if (isset($_GET['driveLink'], $_GET['university'], $_GET['program'], $_GET['semester'], $_GET['module'])) {
    $driveLink = $_GET['driveLink'];
    $university = $_GET['university'];
    $program = $_GET['program'];
    $semester = $_GET['semester'];
    $module = $_GET['module'];

    // Lire le fichier JSON existant, s'il existe
    $filePath = 'modules_data.json';
    if (file_exists($filePath)) {
        // Si le fichier existe, lire son contenu
        $existingData = file_get_contents($filePath);
        $jsonData = json_decode($existingData, true); // Décoder le JSON en tableau associatif
    } else {
        // Si le fichier n'existe pas, initialiser une structure vide
        $jsonData = ["universities" => []];
    }

    // Trouver l'université dans les données existantes ou l'ajouter
    $universityExists = false;
    foreach ($jsonData['universities'] as &$univ) {
        if ($univ['name'] === $university) {
            $universityExists = true;
            // Trouver le programme dans l'université ou l'ajouter
            $programExists = false;
            foreach ($univ['programs'] as &$prog) {
                if ($prog['name'] === $program) {
                    $programExists = true;
                    // Trouver le semestre dans le programme ou l'ajouter
                    $semesterExists = false;
                    foreach ($prog['semesters'] as &$sem) {
                        if ($sem['semester'] === $semester) {
                            $semesterExists = true;
                            // Ajouter le module dans le semestre
                            $sem['modules'][] = [
                                'name' => $module,
                                'link' => $driveLink,
                                'status' => 'approved'
                            ];
                        }
                    }
                    // Si le semestre n'existe pas, l'ajouter
                    if (!$semesterExists) {
                        $prog['semesters'][] = [
                            'semester' => $semester,
                            'modules' => [
                                [
                                    'name' => $module,
                                    'link' => $driveLink,
                                    'status' => 'approved'
                                ]
                            ]
                        ];
                    }
                }
            }
            // Si le programme n'existe pas, l'ajouter
            if (!$programExists) {
                $univ['programs'][] = [
                    'name' => $program,
                    'semesters' => [
                        [
                            'semester' => $semester,
                            'modules' => [
                                [
                                    'name' => $module,
                                    'link' => $driveLink,
                                    'status' => 'approved'
                                ]
                            ]
                        ]
                    ]
                ];
            }
        }
    }

    // Si l'université n'existe pas, l'ajouter
    if (!$universityExists) {
        $jsonData['universities'][] = [
            'name' => $university,
            'programs' => [
                [
                    'name' => $program,
                    'semesters' => [
                        [
                            'semester' => $semester,
                            'modules' => [
                                [
                                    'name' => $module,
                                    'link' => $driveLink,
                                    'status' => 'approved'
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ];
    }

    // Convertir les données mises à jour en JSON et les sauvegarder dans le fichier
    file_put_contents($filePath, json_encode($jsonData, JSON_PRETTY_PRINT));

    // Retourner les données en JSON
    echo json_encode([
        'success' => true,
        'message' => 'Formulaire soumis avec succès.',
        'data' => $jsonData
    ], JSON_PRETTY_PRINT);
} else {
    // Paramètres manquants
    echo json_encode([
        'success' => false,
        'message' => 'Paramètres manquants. Veuillez remplir tous les champs.'
    ]);
}
