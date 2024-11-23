<?php
header("Access-Control-Allow-Origin: https://inforesources.vercel.app");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit;
}

// Récupérer les paramètres de la requête GET
$title = isset($_GET['title']) ? $_GET['title'] : null;
$language = isset($_GET['language']) ? $_GET['language'] : null;
$code = isset($_GET['code']) ? $_GET['code'] : null;

// Vérifie si toutes les clés nécessaires sont présentes
if ($title && $language && $code) {
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
?>
