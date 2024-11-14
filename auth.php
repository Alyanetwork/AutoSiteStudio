<?php
session_start();
require '../config/database.php'; // Veritabanı bağlantısı

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $action = $_POST['action'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    if ($action === 'register') {
        // Kullanıcı kaydı
        $stmt = $db->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$username, $email, $hashed_password]);
        echo json_encode(["status" => "success", "message" => "Kayıt başarılı"]);
    } else if ($action === 'login') {
        // Kullanıcı girişi
        $stmt = $db->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user'] = $user['username'];
            echo json_encode(["status" => "success", "message" => "Giriş başarılı"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Hatalı kullanıcı adı veya şifre"]);
        }
    }
}
?>
