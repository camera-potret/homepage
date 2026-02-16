<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dataDir = __DIR__ . '/../data/';
$viewsFile = $dataDir . 'views.json';

// Inisialisasi file jika belum ada
if (!file_exists($viewsFile)) {
    $initialData = [
        'post-1' => 0,
        'post-2' => 0,
        'post-3' => 0,
        'post-4' => 0,
        'post-5' => 0,
        'post-6' => 0,
        'featured' => 0
    ];
    file_put_contents($viewsFile, json_encode($initialData, JSON_PRETTY_PRINT));
}

$requestMethod = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : '';
$postId = isset($_GET['post_id']) ? $_GET['post_id'] : '';

if ($requestMethod === 'POST' && $action === 'increment') {
    if (empty($postId)) {
        http_response_code(400);
        echo json_encode(['error' => 'post_id is required']);
        exit();
    }

    $views = json_decode(file_get_contents($viewsFile), true);
    
    if (!isset($views[$postId])) {
        $views[$postId] = 0;
    }
    
    $views[$postId]++;
    file_put_contents($viewsFile, json_encode($views, JSON_PRETTY_PRINT));
    
    echo json_encode(['success' => true, 'post_id' => $postId, 'views' => $views[$postId]]);
    exit();
}

if ($requestMethod === 'GET' && $action === 'get') {
    if (empty($postId)) {
        // Ambil semua views
        $views = json_decode(file_get_contents($viewsFile), true);
        echo json_encode($views);
    } else {
        // Ambil views untuk post tertentu
        $views = json_decode(file_get_contents($viewsFile), true);
        $viewCount = isset($views[$postId]) ? $views[$postId] : 0;
        echo json_encode(['post_id' => $postId, 'views' => $viewCount]);
    }
    exit();
}

http_response_code(400);
echo json_encode(['error' => 'Invalid request']);
?>
