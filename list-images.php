<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

$gallery_path = 'images/gallery/';
$images = [];

try {
    // Check if directory exists
    if (!is_dir($gallery_path)) {
        throw new Exception("Gallery directory does not exist: " . $gallery_path);
    }

    // Get all files from the gallery directory
    if ($handle = opendir($gallery_path)) {
        while (false !== ($file = readdir($handle))) {
            if ($file != "." && $file != "..") {
                $images[] = $file;
            }
        }
        closedir($handle);
    } else {
        throw new Exception("Could not open gallery directory");
    }

    // Sort files by modification time (newest first)
    usort($images, function($a, $b) use ($gallery_path) {
        return filemtime($gallery_path . $b) - filemtime($gallery_path . $a);
    });

    echo json_encode(['success' => true, 'images' => $images]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
} 