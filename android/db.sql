-- android_templates tablosu
CREATE TABLE android_templates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    zip_path VARCHAR(255) NOT NULL -- Şablonun zip dosyası olarak kaydedildiği yol
);
