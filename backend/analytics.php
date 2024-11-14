<?php
require '../config/database.php';

// Etkileşim verilerini güncelle
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $projectId = $_POST['project_id'];
    $views = $_POST['views'];
    $uniqueVisitors = $_POST['unique_visitors'];
    $avgSessionDuration = $_POST['avg_session_duration'];
    $bounceRate = $_POST['bounce_rate'];

    $stmt = $db->prepare("INSERT INTO analytics (project_id, views, unique_visitors, avg_session_duration, bounce_rate) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE views = views + VALUES(views), unique_visitors = unique_visitors + VALUES(unique_visitors), avg_session_duration = (avg_session_duration + VALUES(avg_session_duration)) / 2, bounce_rate = (bounce_rate + VALUES(bounce_rate)) / 2");
    $stmt->execute([$projectId, $views, $uniqueVisitors, $avgSessionDuration, $bounceRate]);

    echo json_encode(["status" => "success", "message" => "Etkileşim verileri güncellendi"]);
}

// Etkileşim raporlarını getir
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $projectId = $_GET['project_id'];
    $stmt = $db->prepare("SELECT * FROM analytics WHERE project_id = ?");
    $stmt->execute([$projectId]);
    $analytics = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode($analytics);
}
?>
