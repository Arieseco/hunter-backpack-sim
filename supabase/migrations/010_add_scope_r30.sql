-- Add missing .30-30 tritium sight and link to ウィットロック・モデル86

INSERT INTO scopes (name, magnification, weight, required_score, price, description) VALUES
('トゥルービジョン・トリチウムサイト(モデルR30)', '1', 0.00, 850, 3000, 'サイト先端が常に緑色に発光しており、夜間や暗い場所での視認性が向上する。');

INSERT INTO scope_firearms (scope_id, firearm_id)
SELECT s.id, f.id
FROM scopes s, firearms f
WHERE s.name = 'トゥルービジョン・トリチウムサイト(モデルR30)'
  AND f.name = 'ウィットロック・モデル86'
ON CONFLICT DO NOTHING;
