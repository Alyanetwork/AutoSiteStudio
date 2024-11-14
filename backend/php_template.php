<?php
require '../config/database.php';

// Şablon listesini döndürür
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $stmt = $db->query("SELECT id, name, description FROM templates");
    $templates = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($templates);
}

// Yeni proje başlatır
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $userId = $_POST['user_id'];
    $templateId = $_POST['template_id'];
    $projectName = $_POST['project_name'];

    // Yeni proje kaydı ekle
    $stmt = $db->prepare("INSERT INTO projects (user_id, template_id, project_name) VALUES (?, ?, ?)");
    $stmt->execute([$userId, $templateId, $projectName]);

    echo json_encode(["status" => "success", "message" => "Proje oluşturuldu"]);
}
?>
