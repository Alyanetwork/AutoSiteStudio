-- analytics tablosu
CREATE TABLE analytics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    views INT DEFAULT 0,
    unique_visitors INT DEFAULT 0,
    avg_session_duration FLOAT DEFAULT 0, -- Ortalama oturum süresi
    bounce_rate FLOAT DEFAULT 0, -- Hemen çıkma oranı
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);
