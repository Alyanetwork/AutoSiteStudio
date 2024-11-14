<?php
require '../config/database.php';
require '../vendor/autoload.php'; // Stripe kütüphanesi

\Stripe\Stripe::setApiKey('STRIPE_SECRET_KEY'); // Stripe gizli anahtarınızı buraya ekleyin

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $userId = $_POST['user_id'];
    $token = $_POST['stripeToken']; // Stripe tarafından sağlanan ödeme tokenı

    // Stripe ödeme işlemi
    try {
        $charge = \Stripe\Charge::create([
            'amount' => 1000, // Üyelik ücreti (10 USD örneği)
            'currency' => 'usd',
            'description' => 'AutoSite Studio Premium Üyelik',
            'source' => $token,
        ]);

        // Ödeme başarılı, abonelik bilgilerini güncelle
        $stmt = $db->prepare("INSERT INTO subscriptions (user_id, subscription_type, status, start_date, renewal_date, payment_status, payment_id) VALUES (?, 'premium', 'active', NOW(), DATE_ADD(NOW(), INTERVAL 1 MONTH), 'completed', ?)");
        $stmt->execute([$userId, $charge->id]);

        echo json_encode(["status" => "success", "message" => "Premium üyelik aktif edildi."]);
    } catch (\Stripe\Exception\CardException $e) {
        echo json_encode(["status" => "error", "message" => "Ödeme başarısız: " . $e->getError()->message]);
    }
}
?>
