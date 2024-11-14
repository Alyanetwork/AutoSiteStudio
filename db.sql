-- users tablosu
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- subscriptions tablosu
CREATE TABLE subscriptions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    subscription_type ENUM('basic', 'premium') DEFAULT 'basic',
    status ENUM('active', 'inactive') DEFAULT 'active',
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
