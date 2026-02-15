-- Create database
CREATE DATABASE IF NOT EXISTS candle_cafe_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE candle_cafe_db;

-- Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  graduation_year INT NOT NULL COMMENT '2-digit year (e.g., 66 for 2566/2023)',
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  description TEXT,
  image_filename VARCHAR(255) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_graduation_year (graduation_year),
  INDEX idx_created_at (created_at),
  CONSTRAINT chk_graduation_year CHECK (graduation_year >= 40 AND graduation_year <= 99)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data for testing
INSERT INTO submissions (first_name, last_name, graduation_year, email, phone, description, image_filename, image_url) VALUES
('สมชาย', 'ใจดี', 66, 'somchai@example.com', '0812345678', 'คิดถึงเพื่อนๆ และอาจารย์ทุกคน', 'sample1.jpg', 'http://localhost:3000/uploads/sample1.jpg'),
('สมหญิง', 'รักเรียน', 60, 'somying@example.com', '0823456789', 'ขอบคุณ SIT สำหรับทุกสิ่งที่ได้เรียนรู้', 'sample2.jpg', 'http://localhost:3000/uploads/sample2.jpg');
