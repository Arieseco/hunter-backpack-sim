-- Add rifles that were missing from 005_recreate_firearms.sql

INSERT INTO firearms (name, type, accuracy, recoil, reload_speed, hipfire_accuracy, magazine_capacity, weight, required_score, price) VALUES
('LAPERRIERE OUTRIDER .30-30',  'rifle', 80,  46, 58, 76, 4, 3.00, 0, 0),
('アナンタアクション.22マグナム', 'rifle', 100, 15, 50, 86, 10, 3.00, 0, 0),
('フロスト.257',                 'rifle', 35,  75, 52, 80, 4, 3.00, 0, 0);
