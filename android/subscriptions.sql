-- subscriptions tablosunu güncelleme
ALTER TABLE subscriptions
ADD COLUMN renewal_date DATE,
ADD COLUMN payment_status ENUM('pending', 'completed') DEFAULT 'pending',
ADD COLUMN payment_id VARCHAR(255) NULL; -- Ödeme sağlayıcıdan gelen ödeme kimliği
