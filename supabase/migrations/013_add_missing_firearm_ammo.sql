-- Add firearm_ammo links for firearms added in migration 008
-- These were skipped in 007 because the firearms didn't exist yet.

INSERT INTO firearm_ammo (firearm_id, ammo_id)
SELECT f.id, a.id
FROM (VALUES
  ('LAPERRIERE OUTRIDER .30-30',  '.30-30ソフトポイントラウンドノーズ弾'),
  ('LAPERRIERE OUTRIDER .30-30',  '.30-30ホローポイント弾'),
  ('アナンタアクション.22マグナム', '.22マグナムホローポイント弾'),
  ('アナンタアクション.22マグナム', '.22マグナムジャケッテッド ホローポイント弾'),
  ('フロスト.257',                  '.257ソフトポイント弾'),
  ('フロスト.257',                  '.257ポリマーチップ弾')
) AS pairs(firearm_name, ammo_name)
JOIN firearms f ON f.name = pairs.firearm_name
JOIN ammo    a ON a.name = pairs.ammo_name
ON CONFLICT DO NOTHING;
