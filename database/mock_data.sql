USE candle_cafe_db;

DELETE FROM submissions;

INSERT INTO submissions (first_name, last_name, graduation_year, email, phone, description, image_filename, image_url, created_at, updated_at) VALUES
('Somchai', 'Jaidee', 66, 'somchai@example.com', '0812345678', 'Missing all friends and professors. Thank you SIT for everything!', 'mockup.jpg', 'http://backend:3000/uploads/mockup.jpg', NOW(), NOW()),
('Somying', 'Rukrian', 60, 'somying@example.com', '0823456789', 'Thank you SIT for all the wonderful memories and knowledge.', 'mockup.jpg', 'http://backend:3000/uploads/mockup.jpg', NOW(), NOW()),
('Thanakorn', 'Sangthong', 58, 'thanakorn@example.com', '0834567890', 'Years have passed but the memories are still vivid like yesterday.', 'mockup.jpg', 'http://backend:3000/uploads/mockup.jpg', NOW(), NOW()),
('Pimjai', 'Suksun', 52, 'pimjai@example.com', '0845678901', 'Time flies so fast! Missing all my classmates so much.', 'mockup.jpg', 'http://backend:3000/uploads/mockup.jpg', NOW(), NOW()),
('Wichai', 'Kengkaj', 48, 'wichai@example.com', '0856789012', 'SIT taught me to be a better person. Forever grateful!', 'mockup.jpg', 'http://backend:3000/uploads/mockup.jpg', NOW(), NOW()),
('Napa', 'Fasai', 45, 'napa@example.com', '0867890123', 'So proud to be a SIT alumnus! Happy 30th Anniversary!', 'mockup.jpg', 'http://backend:3000/uploads/mockup.jpg', NOW(), NOW()),
('Arnon', 'Mungmun', 63, 'arnon@example.com', '0878901234', 'Happy 30th Anniversary SIT! Congratulations!', 'mockup.jpg', 'http://backend:3000/uploads/mockup.jpg', NOW(), NOW()),
('Kanya', 'Daoruang', 55, 'kanya@example.com', NULL, 'Missing the lab rooms from my student years. Everything must have changed a lot by now.', 'mockup.jpg', 'http://backend:3000/uploads/mockup.jpg', NOW(), NOW()),
('Piya', 'Rungruang', 40, 'piya@example.com', '0890123456', 'Pioneer batch of SIT! So proud to be part of the history!', 'mockup.jpg', 'http://backend:3000/uploads/mockup.jpg', NOW(), NOW()),
('Manee', 'Sawangjit', 67, 'manee@example.com', '0801234567', 'Just graduated last year! Missing everyone already!', 'mockup.jpg', 'http://backend:3000/uploads/mockup.jpg', NOW(), NOW());
