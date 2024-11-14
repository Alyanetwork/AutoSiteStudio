<?php
require '../config/database.php';

// SEO ve hız analizi yapan fonksiyon
function analyzeProject($projectPath) {
    $results = [
        "seo" => [],
        "performance" => []
    ];

    // Başlık etiketi kontrolü
    if (!file_exists("$projectPath/index.php")) {
        $results["seo"][] = "Ana sayfada <title> etiketi bulunamadı.";
    }

    // Meta açıklama kontrolü
    $indexContent = file_get_contents("$projectPath/index.php");
    if (!strpos($indexContent, "<meta name=\"description\"")) {
        $results["seo"][] = "Ana sayfada meta açıklama bulunamadı.";
    }

    // Görüntü boyutu kontrolü
    $images = glob("$projectPath/images/*.{jpg,png,gif}", GLOB_BRACE);
    foreach ($images as $image) {
        if (filesize($image) > 500 * 1024) { // 500 KB üzeri resimler
            $results["performance"][] = basename($image) . " çok büyük. Optimizasyon önerilir.";
        }
    }

    return $results;
}

// API isteği işleme
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $projectId = $_GET['project_id'];
    $projectPath = "../projects/$projectId"; // Proje yolunu belirleyin

    // SEO ve performans analizi
    $results = analyzeProject($projectPath);
    echo json_encode($results);
}
?>
