<?php
require '../config/database.php';

// Kullanıcıyı projeye ekle
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $projectId = $_POST['project_id'];
    $userId = $_POST['user_id'];
    $role = $_POST['role'] ?? 'collaborator';

    // İş birliğini kontrol et
    $stmt = $db->prepare("SELECT * FROM project_collaborators WHERE project_id = ? AND user_id = ?");
    $stmt->execute([$projectId, $userId]);
    if ($stmt->rowCount() > 0) {
        echo json_encode(["status" => "error", "message" => "Kullanıcı zaten projede mevcut"]);
        exit;
    }

    // Yeni kullanıcı ekle
    $stmt = $db->prepare("INSERT INTO project_collaborators (project_id, user_id, role) VALUES (?, ?, ?)");
    $stmt->execute([$projectId, $userId, $role]);

    echo json_encode(["status" => "success", "message" => "Kullanıcı projeye eklendi"]);
}

// Projedeki tüm iş birliği yapan kullanıcıları getir
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $projectId = $_GET['project_id'];

    $stmt = $db->prepare("SELECT users.username, project_collaborators.role FROM project_collaborators JOIN users ON project_collaborators.user_id = users.id WHERE project_collaborators.project_id = ?");
    $stmt->execute([$projectId]);
    $collaborators = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($collaborators);
}
?>
