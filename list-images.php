<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$gallery_path = 'images/gallery/';
$images = [];

// Get all files from the gallery directory
if (is_dir($gallery_path)) {
    if ($handle = opendir($gallery_path)) {
        while (false !== ($file = readdir($handle))) {
            if ($file != "." && $file != "..") {
                $images[] = $file;
            }
        }
        closedir($handle);
    }
}

// Sort files by modification time (newest first)
usort($images, function($a, $b) use ($gallery_path) {
    return filemtime($gallery_path . $b) - filemtime($gallery_path . $a);
});

echo json_encode($images); 