<?php
header("Access-Control-Allow-Origin: https://inforesources.vercel.app");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // Pas de contenu
    exit;
}
// Décode la charge utile JSON
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Vérifie si les données sont correctement envoyées
if (json_last_error() === JSON_ERROR_NONE) {
    // Vérifie que toutes les clés nécessaires sont présentes
    if (isset($data['title'], $data['language'], $data['code'])) {
        $title = $data['title'];
        $language = $data['language'];
        $code = $data['code'];

        // Exemple de sauvegarde des données (peut être modifié selon vos besoins)
        $filename = 'codes.json';
        $existingData = file_exists($filename) ? json_decode(file_get_contents($filename), true) : [];
        $existingData[] = [
            'title' => $title,
            'language' => $language,
            'code' => $code
        ];

        file_put_contents($filename, json_encode($existingData, JSON_PRETTY_PRINT));

        // Réponse succès
        header('Content-Type: application/json');
        echo json_encode(['status' => 'success', 'message' => 'Code saved successfully.']);
    } else {
        // Réponse d'erreur si les clés manquent
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Missing title, language, or code.']);
    }
} else {
    // Réponse d'erreur si le JSON n'est pas valide
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON payload.']);
}
