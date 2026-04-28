-- Ballistics performance table (score at range per zero-distance setting)
-- direction: 'up'=↑ (bullet still rising), 'down'=↓ (bullet falling)
-- is_out: true when bullet is out of effective range (OUT)
-- No row inserted for '-' (range not applicable for this firearm)
-- ammo_note: non-null only for multi-ammo firearms (グリェルク, キャシディ)

CREATE TABLE firearm_ballistics (
  id             UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
  firearm_id     UUID    NOT NULL REFERENCES firearms(id) ON DELETE CASCADE,
  ammo_note      TEXT,
  zero_distance  INTEGER NOT NULL,
  range_distance INTEGER NOT NULL,
  score          INTEGER,
  direction      TEXT    CHECK (direction IN ('up', 'down')),
  is_out         BOOLEAN NOT NULL DEFAULT false
);

ALTER TABLE firearm_ballistics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_firearm_ballistics" ON firearm_ballistics FOR SELECT USING (true);

-- =====================================================
-- RIFLES  (ranges: 50,100,150,200,250,300,350,400)
-- =====================================================

WITH g AS (SELECT id FROM firearms WHERE name = 'レンジャー.243')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, NULL::text, false),(75,  100, 10, 'down', false),(75,  150, 9,  'down', false),
  (75,  200, 8,  'down', false),(75,  250, 6,  'down', false),(75,  300, 3,  'down', false),
  (75,  350, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, 'up',   false),(150, 150, 10, NULL,   false),
  (150, 200, 10, 'down', false),(150, 250, 8,  'down', false),(150, 300, 6,  'down', false),
  (150, 350, 3,  'down', false),(150, 400, NULL, NULL, true),
  (300, 50,  9,  'up',   false),(300, 100, 8,  'up',   false),(300, 150, 8,  'up',   false),
  (300, 200, 8,  'up',   false),(300, 250, 9,  'up',   false),(300, 300, 10, NULL,   false),
  (300, 350, 9,  'down', false),(300, 400, 6,  'down', false)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = '.223ドーセント')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, NULL::text, false),(75,  100, 10, 'down', false),(75,  150, 10, 'down', false),
  (75,  200, 8,  'down', false),(75,  250, 7,  'down', false),(75,  300, 4,  'down', false),
  (75,  350, 2,  'down', false),(75,  400, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, NULL,   false),(150, 150, 10, NULL,   false),
  (150, 200, 9,  'down', false),(150, 250, 8,  'down', false),(150, 300, 6,  'down', false),
  (150, 350, 4,  'down', false),(150, 400, NULL, NULL, true),
  (300, 50,  9,  'up',   false),(300, 100, 9,  'up',   false),(300, 150, 8,  'up',   false),
  (300, 200, 9,  'up',   false),(300, 250, 9,  'up',   false),(300, 300, 10, NULL,   false),
  (300, 350, 9,  'down', false),(300, 400, 6,  'down', false)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = '.270 ハンツマン')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, NULL::text, false),(75,  100, 10, NULL,   false),(75,  150, 10, 'down', false),
  (75,  200, 9,  'down', false),(75,  250, 7,  'down', false),(75,  300, 5,  'down', false),
  (75,  350, 2,  'down', false),(75,  400, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, NULL,   false),(150, 150, 10, 'up',   false),
  (150, 200, 10, 'down', false),(150, 250, 9,  'down', false),(150, 300, 7,  'down', false),
  (150, 350, 5,  'down', false),(150, 400, 2,  'down', false),
  (300, 50,  9,  'up',   false),(300, 100, 8,  'up',   false),(300, 150, 8,  'up',   false),
  (300, 200, 8,  'up',   false),(300, 250, 9,  'up',   false),(300, 300, 10, NULL,   false),
  (300, 350, 9,  'down', false),(300, 400, 7,  'down', false)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'ウィットロック・モデル86')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (50,  50,  10, NULL::text, false),(50,  100, 10, 'down', false),(50,  150, 8,  'down', false),
  (50,  200, 5,  'down', false),(50,  250, 1,  'down', false),(50,  300, NULL, NULL, true),
  (100, 50,  10, NULL,   false),(100, 100, 10, NULL,   false),(100, 150, 9,  'down', false),
  (100, 200, 6,  'down', false),(100, 250, 2,  'down', false),(100, 300, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, 'up',   false),(150, 150, 10, 'down', false),
  (150, 200, 7,  'down', false),(150, 250, 4,  'down', false),(150, 300, NULL, NULL, true)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = '7mmリージェント・マグナム')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, NULL::text, false),(75,  100, 10, NULL,   false),(75,  150, 10, 'down', false),
  (75,  200, 8,  'down', false),(75,  250, 7,  'down', false),(75,  300, 4,  'down', false),
  (75,  350, 1,  'down', false),(75,  400, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, 'up',   false),(150, 150, 10, NULL,   false),
  (150, 200, 10, NULL,   false),(150, 250, 9,  'down', false),(150, 300, 7,  'down', false),
  (150, 350, 4,  'down', false),(150, 400, 1,  'down', false),
  (300, 50,  9,  'up',   false),(300, 100, 8,  'up',   false),(300, 150, 8,  'up',   false),
  (300, 200, 8,  'up',   false),(300, 250, 9,  'up',   false),(300, 300, 10, NULL,   false),
  (300, 350, 9,  'down', false),(300, 400, 6,  'down', false)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'コーチメイト・レバー.45-70')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (50,  50,  10, NULL::text, false),(50,  100, 10, 'down', false),(50,  150, 8,  'down', false),
  (50,  200, 4,  'down', false),(50,  250, NULL, NULL, true),
  (100, 50,  10, NULL,   false),(100, 100, 10, NULL,   false),(100, 150, 9,  'down', false),
  (100, 200, 5,  'down', false),(100, 250, 1,  'down', false),(100, 300, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, 'up',   false),(150, 150, 10, NULL,   false),
  (150, 200, 7,  'down', false),(150, 250, 3,  'down', false),(150, 300, NULL, NULL, true)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'レンジマスター.338')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, NULL::text, false),(75,  100, 9,  'down', false),(75,  150, 9,  'down', false),
  (75,  200, 8,  'down', false),(75,  250, 5,  'down', false),(75,  300, 3,  'down', false),
  (75,  350, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, NULL,   false),(150, 150, 10, NULL,   false),
  (150, 200, 10, 'down', false),(150, 250, 7,  'down', false),(150, 300, 3,  'down', false),
  (150, 350, 1,  'down', false),(150, 400, NULL, NULL, true),
  (300, 50,  9,  'up',   false),(300, 100, 8,  'up',   false),(300, 150, 8,  'up',   false),
  (300, 200, 8,  'up',   false),(300, 250, 9,  'up',   false),(300, 300, 10, NULL,   false),
  (300, 350, 8,  'down', false),(300, 400, 5,  'down', false)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'キング470DB')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (50,  50,  10, NULL::text, false),(50,  100, 9,  'down', false),(50,  150, 5,  'down', false),
  (50,  200, NULL, NULL, true),
  (100, 50,  9,  'up',   false),(100, 100, 10, NULL,   false),(100, 150, 8,  'down', false),
  (100, 200, NULL, NULL, true),
  (150, 50,  8,  'up',   false),(150, 100, 8,  'up',   false),(150, 150, 9,  'up',   false),
  (150, 200, 4,  'down', false),(150, 250, NULL, NULL, true)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = '.300口径キャニング・マグナム')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, 'up'::text, false),(75,  100, 10, 'down', false),(75,  150, 9,  'down', false),
  (75,  200, 8,  'down', false),(75,  250, 6,  'down', false),(75,  300, 6,  'down', false),
  (75,  350, 3,  'down', false),(75,  400, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, 'up',   false),(150, 150, 10, NULL,   false),
  (150, 200, 10, 'down', false),(150, 250, 7,  'down', false),(150, 300, 6,  'down', false),
  (150, 350, 5,  'down', false),(150, 400, 3,  'down', false),
  (300, 50,  9,  'up',   false),(300, 100, 8,  'up',   false),(300, 150, 8,  'up',   false),
  (300, 200, 8,  'up',   false),(300, 250, 9,  'up',   false),(300, 300, 10, NULL,   false),
  (300, 350, 9,  'down', false),(300, 400, 7,  'down', false)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'マーテンソン 6.5mm')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, NULL::text, false),(75,  100, 10, NULL,   false),(75,  150, 9,  NULL,   false),
  (75,  200, 8,  'down', false),(75,  250, 6,  'down', false),(75,  300, 3,  'down', false),
  (75,  350, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, 'up',   false),(150, 150, 10, NULL,   false),
  (150, 200, 9,  'down', false),(150, 250, 7,  'down', false),(150, 300, 5,  'down', false),
  (150, 350, 1,  'down', false),(150, 400, NULL, NULL, true),
  (300, 50,  9,  'up',   false),(300, 100, 8,  'up',   false),(300, 150, 8,  'up',   false),
  (300, 200, 8,  'up',   false),(300, 250, 9,  'up',   false),(300, 300, 10, NULL,   false),
  (300, 350, 8,  'down', false),(300, 400, 5,  'down', false)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'F.L.スポーター.303')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, NULL::text, false),(75,  100, 10, NULL,   false),(75,  150, 10, 'down', false),
  (75,  200, 9,  'down', false),(75,  250, 7,  'down', false),(75,  300, 4,  'down', false),
  (75,  350, 1,  'down', false),(75,  400, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, 'up',   false),(150, 150, 10, NULL,   false),
  (150, 200, 10, 'down', false),(150, 250, 9,  'down', false),(150, 300, 7,  'down', false),
  (150, 350, 4,  'down', false),(150, 400, 1,  'down', false),
  (300, 50,  9,  'up',   false),(300, 100, 9,  'up',   false),(300, 150, 8,  'up',   false),
  (300, 200, 8,  'up',   false),(300, 250, 9,  'up',   false),(300, 300, 10, NULL,   false),
  (300, 350, 8,  'down', false),(300, 400, 6,  'down', false)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'クルマン.22H')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (50,  50,  10, NULL::text, false),(50,  100, 10, 'down', false),(50,  150, 8,  'down', false),
  (50,  200, 5,  'down', false),(50,  250, NULL, NULL, true),
  (100, 50,  10, NULL,   false),(100, 100, 10, NULL,   false),(100, 150, 9,  'down', false),
  (100, 200, 6,  'down', false),(100, 250, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 9,  'up',   false),(150, 150, 10, NULL,   false),
  (150, 200, 8,  'down', false),(150, 250, 3,  'down', false),(150, 300, NULL, NULL, true)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'クーマン.50インライン')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, NULL::text, false),(75,  100, 10, 'down', false),(75,  150, 7,  'down', false),
  (75,  200, 3,  'down', false),(75,  250, NULL, NULL, true),
  (100, 50,  10, 'up',   false),(100, 100, 10, NULL,   false),(100, 150, 8,  'down', false),
  (100, 200, 4,  'down', false),(100, 250, NULL, NULL, true),
  (150, 50,  9,  'up',   false),(150, 100, 10, 'up',   false),(150, 150, 10, 'down', false),
  (150, 200, 7,  'down', false),(150, 250, 3,  'down', false),(150, 300, NULL, NULL, true)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'ザガンヴァーミンター.22-250')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, NULL::text, false),(75,  100, 10, 'down', false),(75,  150, 9,  'down', false),
  (75,  200, 8,  'down', false),(75,  250, 7,  'down', false),(75,  300, 5,  'down', false),
  (75,  350, 3,  'down', false),(75,  400, 1,  'down', false),
  (150, 50,  10, 'up',   false),(150, 100, 10, NULL,   false),(150, 150, 10, NULL,   false),
  (150, 200, 10, 'down', false),(150, 250, 9,  'down', false),(150, 300, 8,  'down', false),
  (150, 350, 6,  'down', false),(150, 400, 4,  'down', false),
  (300, 50,  10, 'up',   false),(300, 100, 9,  'up',   false),(300, 150, 9,  'up',   false),
  (300, 200, 9,  'up',   false),(300, 250, 9,  'up',   false),(300, 300, 10, NULL,   false),
  (300, 350, 9,  'down', false),(300, 400, 8,  'down', false)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'LAPERRIERE OUTRIDER .30-30')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (50,  50,  10, NULL::text, false),(50,  100, 10, 'down', false),(50,  150, 8,  'down', false),
  (50,  200, 5,  'down', false),(50,  250, 1,  'down', false),(50,  300, NULL, NULL, true),
  (100, 50,  10, NULL,   false),(100, 100, 10, NULL,   false),(100, 150, 9,  'down', false),
  (100, 200, 6,  'down', false),(100, 250, 2,  'down', false),(100, 300, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, 'up',   false),(150, 150, 10, 'down', false),
  (150, 200, 7,  'down', false),(150, 250, 4,  'down', false),(150, 300, NULL, NULL, true)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'ヴァイラント.22LR')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (50,  50,  10, NULL::text, false),(50,  100, 9,  'down', false),(50,  150, 4,  'down', false),
  (50,  200, NULL, NULL, true),(50,  250, NULL, NULL, true),
  (100, 50,  9,  'up',   false),(100, 100, 10, NULL,   false),(100, 150, 7,  'down', false),
  (100, 200, 1,  'down', false),(100, 250, NULL, NULL, true),
  (150, 50,  8,  'up',   false),(150, 100, 8,  'up',   false),(150, 150, 10, NULL,   false),
  (150, 200, 5,  'down', false),(150, 250, NULL, NULL, true)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'ソロキンMN1890')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, NULL::text, false),(75,  100, 10, 'down', false),(75,  150, 9,  'down', false),
  (75,  200, 8,  'down', false),(75,  250, 5,  'down', false),(75,  300, 2,  'down', false),
  (75,  350, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, 'up',   false),(150, 150, 10, NULL,   false),
  (150, 200, 10, 'down', false),(150, 250, 8,  'down', false),(150, 300, 5,  'down', false),
  (150, 350, 1,  'down', false),(150, 400, NULL, NULL, true),
  (300, 50,  9,  'up',   false),(300, 100, 8,  'up',   false),(300, 150, 8,  'up',   false),
  (300, 200, 8,  'up',   false),(300, 250, 9,  'up',   false),(300, 300, 10, NULL,   false),
  (300, 350, 8,  'down', false),(300, 400, 4,  'down', false)
) v(z,r,s,d,o);

-- バスケズ・サイクロン.45 uses rifle ranges but very short effective range
WITH g AS (SELECT id FROM firearms WHERE name = 'バスケズ・サイクロン.45')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (25,  50,  9,  'down'::text, false),(25,  100, 1,  'down', false),(25,  150, NULL, NULL, true),
  (50,  50,  10, NULL,   false),(50,  100, 4,  'down', false),(50,  150, NULL, NULL, true),
  (100, 50,  7,  'up',   false),(100, 100, 10, NULL,   false),(100, 150, 1,  'down', false),
  (100, 200, NULL, NULL, true)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'エッカー.30-06')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, NULL::text, false),(75,  100, 10, 'down', false),(75,  150, 9,  'down', false),
  (75,  200, 8,  'down', false),(75,  250, 6,  'down', false),(75,  300, 3,  'down', false),
  (75,  350, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, 'up',   false),(150, 150, 10, NULL,   false),
  (150, 200, 10, 'down', false),(150, 250, 8,  'down', false),(150, 300, 6,  'down', false),
  (150, 350, 3,  'down', false),(150, 400, NULL, NULL, true),
  (300, 50,  9,  'up',   false),(300, 100, 8,  'up',   false),(300, 150, 8,  'up',   false),
  (300, 200, 8,  'up',   false),(300, 250, 9,  'up',   false),(300, 300, 10, NULL,   false),
  (300, 350, 8,  'down', false),(300, 400, 6,  'down', false)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'ハジック.50 キャップロック')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (100, 50,  10, 'up'::text, false),(100, 100, 10, NULL,   false),(100, 150, 9,  'down', false),
  (100, 200, 5,  'down', false),(100, 250, NULL, NULL, true),
  (150, 50,  9,  'up',   false),(150, 100, 9,  'up',   false),(150, 150, 10, NULL,   false),
  (150, 200, 7,  'down', false),(150, 250, 1,  'down', false),(150, 300, NULL, NULL, true),
  (200, 50,  8,  'up',   false),(200, 100, 8,  'up',   false),(200, 150, 8,  'up',   false),
  (200, 200, 10, NULL,   false),(200, 250, 6,  'down', false),(200, 300, NULL, NULL, true)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'M1イヴァニエツ')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, NULL::text, false),(75,  100, 10, NULL,   false),(75,  150, 10, 'down', false),
  (75,  200, 8,  'down', false),(75,  250, 6,  'down', false),(75,  300, 4,  'down', false),
  (75,  350, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, 'up',   false),(150, 150, 10, NULL,   false),
  (150, 200, 9,  'down', false),(150, 250, 7,  'down', false),(150, 300, 5,  'down', false),
  (150, 350, 2,  'down', false),(150, 400, NULL, NULL, true),
  (300, 50,  9,  'up',   false),(300, 100, 9,  'up',   false),(300, 150, 8,  'up',   false),
  (300, 200, 8,  'up',   false),(300, 250, 9,  'up',   false),(300, 300, 10, NULL,   false),
  (300, 350, 8,  'down', false),(300, 400, 5,  'down', false)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'ザルザ-15.22LR')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (50,  50,  10, NULL::text, false),(50,  100, 9,  'down', false),(50,  150, 4,  'down', false),
  (50,  200, NULL, NULL, true),(50,  250, NULL, NULL, true),
  (100, 50,  9,  'up',   false),(100, 100, 10, NULL,   false),(100, 150, 7,  'down', false),
  (100, 200, 1,  'down', false),(100, 250, NULL, NULL, true),
  (150, 50,  8,  'up',   false),(150, 100, 8,  'up',   false),(150, 150, 10, 'up',   false),
  (150, 200, 6,  'down', false),(150, 250, NULL, NULL, true)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'ザルザ-15.223')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, NULL::text, false),(75,  100, 10, 'down', false),(75,  150, 10, 'down', false),
  (75,  200, 9,  'down', false),(75,  250, 7,  'down', false),(75,  300, 5,  'down', false),
  (75,  350, 2,  'down', false),(75,  400, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, NULL,   false),(150, 150, 10, NULL,   false),
  (150, 200, 10, 'down', false),(150, 250, 8,  'down', false),(150, 300, 6,  'down', false),
  (150, 350, 4,  'down', false),(150, 400, NULL, NULL, true),
  (300, 50,  9,  'up',   false),(300, 100, 9,  'up',   false),(300, 150, 8,  'up',   false),
  (300, 200, 8,  'up',   false),(300, 250, 9,  'up',   false),(300, 300, 10, NULL,   false),
  (300, 350, 9,  'down', false),(300, 400, 6,  'down', false)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'ザルザ-10.308')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, NULL::text, false),(75,  100, 10, NULL,   false),(75,  150, 10, 'down', false),
  (75,  200, 8,  'down', false),(75,  250, 6,  'down', false),(75,  300, 4,  'down', false),
  (75,  350, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, 'up',   false),(150, 150, 10, NULL,   false),
  (150, 200, 9,  'down', false),(150, 250, 8,  'down', false),(150, 300, 5,  'down', false),
  (150, 350, 2,  'down', false),(150, 400, NULL, NULL, true),
  (300, 50,  9,  'up',   false),(300, 100, 9,  'up',   false),(300, 150, 8,  'up',   false),
  (300, 200, 8,  'up',   false),(300, 250, 9,  'up',   false),(300, 300, 10, 'down', false),
  (300, 350, 7,  'down', false),(300, 400, 4,  'down', false)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'ツルギLRR.338')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, NULL::text, false),(75,  100, 10, 'down', false),(75,  150, 9,  'down', false),
  (75,  200, 8,  'down', false),(75,  250, 5,  'down', false),(75,  300, 2,  'down', false),
  (75,  350, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, 'up',   false),(150, 150, 10, NULL,   false),
  (150, 200, 9,  'down', false),(150, 250, 7,  'down', false),(150, 300, 5,  'down', false),
  (150, 350, 1,  'down', false),(150, 400, NULL, NULL, true),
  (300, 50,  9,  'up',   false),(300, 100, 8,  'up',   false),(300, 150, 8,  'up',   false),
  (300, 200, 8,  'up',   false),(300, 250, 9,  'up',   false),(300, 300, 10, NULL,   false),
  (300, 350, 8,  'down', false),(300, 400, 5,  'down', false)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'マルメル7mmマグナム')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  -- zero 75: range 400 is '-', skip
  (75,  50,  10, NULL::text, false),(75,  100, 10, NULL,   false),(75,  150, 9,  'down', false),
  (75,  200, 8,  'down', false),(75,  250, 6,  'down', false),(75,  300, 4,  'down', false),
  (75,  350, 1,  'down', false),
  (150, 50,  10, 'up',   false),(150, 100, 10, 'up',   false),(150, 150, 10, NULL,   false),
  (150, 200, 9,  'down', false),(150, 250, 8,  'down', false),(150, 300, 5,  'down', false),
  (150, 350, 3,  'down', false),(150, 400, NULL, NULL, true),
  (300, 50,  9,  'up',   false),(300, 100, 8,  'up',   false),(300, 150, 8,  'up',   false),
  (300, 200, 8,  'up',   false),(300, 250, 9,  'up',   false),(300, 300, 10, NULL,   false),
  (300, 350, 8,  'down', false),(300, 400, 6,  'down', false)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'オルソンモデル23.308')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, NULL::text, false),(75,  100, 10, NULL,   false),(75,  150, 9,  'down', false),
  (75,  200, 8,  'down', false),(75,  250, 6,  'down', false),(75,  300, 3,  'down', false),
  (75,  350, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, 'up',   false),(150, 150, 10, NULL,   false),
  (150, 200, 9,  'down', false),(150, 250, 8,  'down', false),(150, 300, 5,  'down', false),
  (150, 350, 2,  'down', false),(150, 400, NULL, NULL, true),
  (300, 50,  9,  'up',   false),(300, 100, 8,  'up',   false),(300, 150, 8,  'up',   false),
  (300, 200, 8,  'up',   false),(300, 250, 8,  'up',   false),(300, 300, 10, NULL,   false),
  (300, 350, 8,  'down', false),(300, 400, 6,  'down', false)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'モラディーモデル1894')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (50,  50,  10, NULL::text, false),(50,  100, 9,  'down', false),(50,  150, 6,  'down', false),
  (50,  200, 1,  'down', false),(50,  250, NULL, NULL, true),
  (100, 50,  10, 'up',   false),(100, 100, 10, NULL,   false),(100, 150, 8,  'down', false),
  (100, 200, 4,  'down', false),(100, 250, NULL, NULL, true),
  (150, 50,  9,  'up',   false),(150, 100, 9,  'up',   false),(150, 150, 10, 'down', false),
  (150, 200, 7,  'down', false),(150, 250, 1,  'down', false),(150, 300, NULL, NULL, true)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'アルジナ.300タクティカルマグナム')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, NULL::text, false),(75,  100, 10, NULL,   false),(75,  150, 10, 'down', false),
  (75,  200, 9,  'down', false),(75,  250, 7,  'down', false),(75,  300, 5,  'down', false),
  (75,  350, 2,  'down', false),(75,  400, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, 'up',   false),(150, 150, 10, NULL,   false),
  (150, 200, 10, 'down', false),(150, 250, 8,  'down', false),(150, 300, 7,  'down', false),
  (150, 350, 5,  'down', false),(150, 400, 2,  'down', false),
  (300, 50,  9,  'up',   false),(300, 100, 9,  'up',   false),(300, 150, 8,  'up',   false),
  (300, 200, 8,  'up',   false),(300, 250, 9,  'up',   false),(300, 300, 10, NULL,   false),
  (300, 350, 9,  'down', false),(300, 400, 7,  'down', false)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'ヴァルガーダ.375')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, NULL::text, false),(75,  100, 10, 'down', false),(75,  150, 9,  'down', false),
  (75,  200, 7,  'down', false),(75,  250, 3,  'down', false),(75,  300, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, NULL,   false),(150, 150, 10, 'down', false),
  (150, 200, 9,  'down', false),(150, 250, 7,  'down', false),(150, 300, 3,  'down', false),
  (150, 350, NULL, NULL, true),
  (300, 50,  9,  'up',   false),(300, 100, 7,  'up',   false),(300, 150, 7,  'up',   false),
  (300, 200, 7,  'up',   false),(300, 250, 8,  'up',   false),(300, 300, 10, NULL,   false),
  (300, 350, 7,  'down', false),(300, 400, 3,  'down', false)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'ヨハンソン.450')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, NULL::text, false),(75,  100, 10, 'down', false),(75,  150, 9,  'down', false),
  (75,  200, 7,  'down', false),(75,  250, 3,  'down', false),(75,  300, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, NULL,   false),(150, 150, 10, 'down', false),
  (150, 200, 9,  'down', false),(150, 250, 7,  'down', false),(150, 300, 3,  'down', false),
  (150, 350, NULL, NULL, true),
  (300, 50,  9,  'up',   false),(300, 100, 7,  'up',   false),(300, 150, 7,  'up',   false),
  (300, 200, 7,  'up',   false),(300, 250, 8,  'up',   false),(300, 300, 10, NULL,   false),
  (300, 350, 7,  'down', false),(300, 400, 3,  'down', false)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'フォルス・エリート.300')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, NULL::text, false),(75,  100, 10, 'down', false),(75,  150, 9,  'down', false),
  (75,  200, 7,  'down', false),(75,  250, 4,  'down', false),(75,  300, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, 'up',   false),(150, 150, 10, NULL,   false),
  (150, 200, 9,  'down', false),(150, 250, 6,  'down', false),(150, 300, 3,  'down', false),
  (150, 350, NULL, NULL, true),
  (300, 50,  8,  'up',   false),(300, 100, 7,  'up',   false),(300, 150, 7,  'up',   false),
  (300, 200, 7,  'up',   false),(300, 250, 8,  'up',   false),(300, 300, 10, NULL,   false),
  (300, 350, 8,  'down', false),(300, 400, 4,  'down', false)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'ペリー.308')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, NULL::text, false),(75,  100, 10, NULL,   false),(75,  150, 10, 'down', false),
  (75,  200, 8,  'down', false),(75,  250, 6,  'down', false),(75,  300, 4,  'down', false),
  (75,  350, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, 'up',   false),(150, 150, 10, NULL,   false),
  (150, 200, 9,  'down', false),(150, 250, 8,  'down', false),(150, 300, 5,  'down', false),
  (150, 350, 2,  'down', false),(150, 400, NULL, NULL, true),
  (300, 50,  9,  'up',   false),(300, 100, 9,  'up',   false),(300, 150, 8,  'up',   false),
  (300, 200, 8,  'up',   false),(300, 250, 9,  'up',   false),(300, 300, 10, 'down', false),
  (300, 350, 7,  'down', false),(300, 400, 4,  'down', false)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'ハンソン.30-06')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, NULL::text, false),(75,  100, 10, NULL,   false),(75,  150, 10, 'down', false),
  (75,  200, 8,  'down', false),(75,  250, 6,  'down', false),(75,  300, 4,  'down', false),
  (75,  350, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, 'up',   false),(150, 150, 10, NULL,   false),
  (150, 200, 9,  'down', false),(150, 250, 7,  'down', false),(150, 300, 5,  'down', false),
  (150, 350, 2,  'down', false),(150, 400, NULL, NULL, true),
  (300, 50,  9,  'up',   false),(300, 100, 9,  'up',   false),(300, 150, 8,  'up',   false),
  (300, 200, 8,  'up',   false),(300, 250, 9,  'up',   false),(300, 300, 10, NULL,   false),
  (300, 350, 8,  'down', false),(300, 400, 5,  'down', false)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'フロスト.257')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, NULL::text, false),(75,  100, 10, NULL,   false),(75,  150, 10, 'down', false),
  (75,  200, 9,  'down', false),(75,  250, 7,  NULL,   false),(75,  300, 5,  NULL,   false),
  (75,  350, 3,  'down', false),(75,  400, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, NULL,   false),(150, 150, 10, NULL,   false),
  (150, 200, 10, 'down', false),(150, 250, 8,  NULL,   false),(150, 300, 7,  'down', false),
  (150, 350, 4,  NULL,   false),(150, 400, 1,  NULL,   false),
  (300, 50,  9,  'up',   false),(300, 100, 8,  'up',   false),(300, 150, 8,  'up',   false),
  (300, 200, 9,  'up',   false),(300, 250, 9,  'up',   false),(300, 300, 10, NULL,   false),
  (300, 350, 9,  NULL,   false),(300, 400, 6,  'down', false)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'アナンタアクション.22マグナム')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (50,  50,  10, NULL::text, false),(50,  100, 10, 'down', false),(50,  150, 7,  NULL,   false),
  (50,  200, 5,  NULL,   false),(50,  250, NULL, NULL, true),
  (100, 50,  10, NULL,   false),(100, 100, 10, NULL,   false),(100, 150, 9,  'down', false),
  (100, 200, 6,  'down', false),(100, 250, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 9,  'up',   false),(150, 150, 10, NULL,   false),
  (150, 200, 7,  NULL,   false),(150, 250, 1,  'down', false),(150, 300, NULL, NULL, true)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'リチャードソン.500')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, NULL::text, false),(75,  100, 10, NULL,   false),(75,  150, 9,  NULL,   false),
  (75,  200, 6,  NULL,   false),(75,  250, 2,  NULL,   false),(75,  300, NULL, NULL, true),
  (75,  350, NULL, NULL, true),(75,  400, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, 'up',   false),(150, 150, 10, NULL,   false),
  (150, 200, 8,  NULL,   false),(150, 250, 5,  NULL,   false),(150, 300, 2,  'down', false),
  (150, 350, NULL, NULL, true),(150, 400, NULL, NULL, true),
  (300, 50,  8,  NULL,   false),(300, 100, 7,  NULL,   false),(300, 150, 6,  NULL,   false),
  (300, 200, 6,  NULL,   false),(300, 250, 8,  NULL,   false),(300, 300, 10, NULL,   false),
  (300, 350, 9,  NULL,   false),(300, 400, 6,  'down', false)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'アリス・プレシジョンショット.25-06')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, NULL::text, false),(75,  100, 10, NULL,   false),(75,  150, 10, 'down', false),
  (75,  200, 9,  'down', false),(75,  250, 7,  NULL,   false),(75,  300, 5,  NULL,   false),
  (75,  350, 3,  'down', false),(75,  400, NULL, NULL, true),
  (150, 50,  10, 'up',   false),(150, 100, 10, NULL,   false),(150, 150, 10, NULL,   false),
  (150, 200, 10, 'down', false),(150, 250, 8,  NULL,   false),(150, 300, 7,  'down', false),
  (150, 350, 4,  NULL,   false),(150, 400, 1,  NULL,   false),
  (300, 50,  9,  'up',   false),(300, 100, 8,  'up',   false),(300, 150, 8,  'up',   false),
  (300, 200, 9,  'up',   false),(300, 250, 9,  'up',   false),(300, 300, 10, NULL,   false),
  (300, 350, 9,  NULL,   false),(300, 400, 6,  'down', false)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'ヨニアロス.17HMR')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (75,  50,  10, NULL::text, false),(75,  100, 10, 'down', false),(75,  150, 8,  NULL,   false),
  (75,  200, 4,  NULL,   false),(75,  250, NULL, NULL, true),
  (150, 50,  9,  NULL,   false),(150, 100, 9,  NULL,   false),(150, 150, 10, NULL,   false),
  (150, 200, 6,  NULL,   false),(150, 250, 2,  'up',   false),(150, 300, NULL, NULL, true),
  (300, 50,  7,  'up',   false),(300, 100, 4,  NULL,   false),(300, 150, 2,  'up',   false),
  (300, 200, 2,  'up',   false),(300, 250, 5,  'up',   false),(300, 300, 10, NULL,   false),
  (300, 350, NULL, NULL, true)
) v(z,r,s,d,o);

-- =====================================================
-- HANDGUNS  (ranges: 25,50,75,100,125,150,175,200)
-- =====================================================

WITH g AS (SELECT id FROM firearms WHERE name = 'フォコーソ357')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (25, 25,  10, NULL::text, false),(25, 50,  10, NULL,   false),(25, 75,  10, 'down', false),
  (25, 100, 8,  'down', false),(25, 125, 7,  'down', false),(25, 150, 4,  'down', false),
  (25, 175, 1,  'down', false),(25, 200, NULL, NULL, true),
  (50, 25,  10, NULL,   false),(50, 50,  10, NULL,   false),(50, 75,  10, 'down', false),
  (50, 100, 8,  'down', false),(50, 125, 7,  'down', false),(50, 150, 4,  'down', false),
  (50, 175, 1,  'down', false),(50, 200, NULL, NULL, true),
  (75, 25,  10, 'up',   false),(75, 50,  10, 'up',   false),(75, 75,  10, NULL,   false),
  (75, 100, 10, 'down', false),(75, 125, 9,  'down', false),(75, 150, 6,  'down', false),
  (75, 175, 3,  'down', false),(75, 200, NULL, NULL, true)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = '.44パンサー・マグナム')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (25, 25,  10, NULL::text, false),(25, 50,  10, NULL,   false),(25, 75,  9,  'down', false),
  (25, 100, 8,  'down', false),(25, 125, 5,  'down', false),(25, 150, 2,  'down', false),
  (25, 175, NULL, NULL, true),
  (50, 25,  10, NULL,   false),(50, 50,  10, NULL,   false),(50, 75,  9,  'down', false),
  (50, 100, 8,  'down', false),(50, 125, 6,  'down', false),(50, 150, 2,  'down', false),
  (50, 175, NULL, NULL, true),
  (75, 25,  10, 'up',   false),(75, 50,  10, 'up',   false),(75, 75,  10, NULL,   false),
  (75, 100, 10, 'down', false),(75, 125, 7,  'down', false),(75, 150, 4,  'down', false),
  (75, 175, NULL, NULL, true)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'ライノ454')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (25, 25,  10, NULL::text, false),(25, 50,  10, NULL,   false),(25, 75,  10, 'down', false),
  (25, 100, 9,  'down', false),(25, 125, 7,  'down', false),(25, 150, 5,  'down', false),
  (25, 175, 1,  'down', false),(25, 200, NULL, NULL, true),
  (50, 25,  10, NULL,   false),(50, 50,  10, NULL,   false),(50, 75,  10, 'down', false),
  (50, 100, 9,  'down', false),(50, 125, 7,  'down', false),(50, 150, 4,  'down', false),
  (50, 175, 1,  'down', false),(50, 200, NULL, NULL, true),
  (75, 25,  10, 'up',   false),(75, 50,  10, 'up',   false),(75, 75,  10, NULL,   false),
  (75, 100, 9,  'down', false),(75, 125, 8,  'down', false),(75, 150, 5,  'down', false),
  (75, 175, 2,  'down', false),(75, 200, NULL, NULL, true)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'マンギアフィコ410/45コルト')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (25, 25,  10, NULL::text, false),(25, 50,  10, 'down', false),(25, 75,  8,  'down', false),
  (25, 100, 5,  'down', false),(25, 125, NULL, NULL, true),
  (50, 25,  10, 'up',   false),(50, 50,  10, NULL,   false),(50, 75,  9,  'down', false),
  (50, 100, 7,  'down', false),(50, 125, 3,  'down', false),(50, 150, NULL, NULL, true),
  (75, 25,  9,  'up',   false),(75, 50,  9,  'up',   false),(75, 75,  10, NULL,   false),
  (75, 100, 8,  'down', false),(75, 125, 5,  'down', false),(75, 150, NULL, NULL, true)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'アンダーソン.22LR')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (25, 25,  10, NULL::text, false),(25, 50,  9,  'down', false),(25, 75,  7,  'down', false),
  (25, 100, 3,  'down', false),(25, 125, NULL, NULL, true),
  (50, 25,  10, 'up',   false),(50, 50,  10, NULL,   false),(50, 75,  9,  'down', false),
  (50, 100, 6,  'down', false),(50, 125, 1,  'down', false),(50, 150, NULL, NULL, true),
  (75, 25,  9,  'up',   false),(75, 50,  9,  'up',   false),(75, 75,  10, NULL,   false),
  (75, 100, 8,  'down', false),(75, 125, 5,  'down', false),(75, 150, NULL, NULL, true)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = '10mmダヴァニ')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (25, 25,  10, 'up'::text, false),(25, 50,  10, NULL,   false),(25, 75,  9,  'down', false),
  (25, 100, 8,  'down', false),(25, 125, 7,  'down', false),(25, 150, 3,  'down', false),
  (25, 175, NULL, NULL, true),
  (50, 25,  10, 'up',   false),(50, 50,  10, 'up',   false),(50, 75,  10, 'down', false),
  (50, 100, 9,  'down', false),(50, 125, 8,  'down', false),(50, 150, 4,  'down', false),
  (50, 175, 1,  'down', false),(50, 200, NULL, NULL, true),
  (75, 25,  9,  'up',   false),(75, 50,  9,  'up',   false),(75, 75,  10, 'up',   false),
  (75, 100, 10, 'up',   false),(75, 125, 10, 'down', false),(75, 150, 7,  'down', false),
  (75, 175, 4,  'down', false),(75, 200, 1,  'down', false)
) v(z,r,s,d,o);

-- .243R.クオモ is a handgun but uses rifle ranges
WITH g AS (SELECT id FROM firearms WHERE name = '.243R.クオモ')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (50,  50,  10, NULL::text, false),(50,  100, 10, NULL,   false),(50,  150, 10, 'down', false),
  (50,  200, 8,  'down', false),(50,  250, 6,  'down', false),(50,  300, 4,  'down', false),
  (50,  350, NULL, NULL, true),
  (100, 50,  10, NULL,   false),(100, 100, 10, NULL,   false),(100, 150, 10, NULL,   false),
  (100, 200, 9,  'down', false),(100, 250, 7,  'down', false),(100, 300, 5,  'down', false),
  (100, 350, 1,  'down', false),(100, 400, NULL, NULL, true),
  (200, 50,  10, 'up',   false),(200, 100, 9,  'up',   false),(200, 150, 9,  'up',   false),
  (200, 200, 10, NULL,   false),(200, 250, 9,  'down', false),(200, 300, 7,  'down', false),
  (200, 350, 5,  'down', false),(200, 400, 1,  'down', false)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = '.45ロールストン')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (25, 25,  10, 'up'::text, false),(25, 50,  10, NULL,   false),(25, 75,  8,  'down', false),
  (25, 100, 6,  'down', false),(25, 125, 2,  'down', false),(25, 150, NULL, NULL, true),
  (50, 25,  10, 'up',   false),(50, 50,  10, NULL,   false),(50, 75,  8,  'down', false),
  (50, 100, 6,  'down', false),(50, 125, 3,  'down', false),(50, 150, NULL, NULL, true),
  (75, 25,  10, 'up',   false),(75, 50,  9,  'up',   false),(75, 75,  10, NULL,   false),
  (75, 100, 8,  'down', false),(75, 125, 5,  'down', false),(75, 150, NULL, NULL, true)
) v(z,r,s,d,o);

-- .45-70イェルンベリ・スペリオル is a handgun but uses rifle ranges
WITH g AS (SELECT id FROM firearms WHERE name = '.45-70イェルンベリ・スペリオル')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (50,  50,  10, NULL::text, false),(50,  100, 9,  'down', false),(50,  150, 6,  'down', false),
  (50,  200, 2,  'down', false),(50,  250, NULL, NULL, true),
  (100, 50,  10, NULL,   false),(100, 100, 10, NULL,   false),(100, 150, 9,  'down', false),
  (100, 200, 5,  'down', false),(100, 250, NULL, NULL, true),
  (200, 50,  8,  'up',   false),(200, 100, 8,  'up',   false),(200, 150, 8,  'up',   false),
  (200, 200, 10, NULL,   false),(200, 250, 7,  'down', false),(200, 300, 1,  'down', false),
  (200, 350, NULL, NULL, true)
) v(z,r,s,d,o);

-- =====================================================
-- SHOTGUNS  (ranges: 50,75,100,125,150,175,200,225)
-- =====================================================

WITH g AS (SELECT id FROM firearms WHERE name = 'カバーシャム・スチュワード12G')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (50,  50,  10, NULL::text, false),(50,  75,  10, 'down', false),(50,  100, 9,  'down', false),
  (50,  125, 7,  'down', false),(50,  150, 4,  'down', false),(50,  175, 1,  'down', false),
  (50,  200, NULL, NULL, true),
  (100, 50,  9,  'up',   false),(100, 75,  10, 'up',   false),(100, 100, 10, NULL,   false),
  (100, 125, 9,  'down', false),(100, 150, 7,  'down', false),(100, 175, 4,  'down', false),
  (100, 200, NULL, NULL, true),
  (150, 50,  8,  'up',   false),(150, 75,  8,  'up',   false),(150, 100, 8,  'up',   false),
  (150, 125, 9,  'up',   false),(150, 150, 10, NULL,   false),(150, 175, 7,  'down', false),
  (150, 200, 4,  'down', false),(150, 225, NULL, NULL, true)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'カチャトーラ12G')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (50,  50,  10, NULL::text, false),(50,  75,  10, 'down', false),(50,  100, 9,  'down', false),
  (50,  125, 7,  'down', false),(50,  150, 4,  'down', false),(50,  175, 1,  'down', false),
  (50,  200, NULL, NULL, true),
  (100, 50,  9,  'up',   false),(100, 75,  10, 'up',   false),(100, 100, 10, NULL,   false),
  (100, 125, 9,  'down', false),(100, 150, 7,  'down', false),(100, 175, 4,  'down', false),
  (100, 200, NULL, NULL, true),
  (150, 50,  8,  'up',   false),(150, 75,  8,  'up',   false),(150, 100, 8,  'up',   false),
  (150, 125, 9,  'up',   false),(150, 150, 10, NULL,   false),(150, 175, 7,  'down', false),
  (150, 200, 4,  'down', false),(150, 225, NULL, NULL, true)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'グランキンズ・ショットガン')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (50,  50,  10, NULL::text, false),(50,  75,  10, 'down', false),(50,  100, 9,  'down', false),
  (50,  125, 7,  'down', false),(50,  150, 4,  'down', false),(50,  175, 1,  'down', false),
  (50,  200, NULL, NULL, true),
  (100, 50,  9,  'up',   false),(100, 75,  10, 'up',   false),(100, 100, 10, NULL,   false),
  (100, 125, 9,  'down', false),(100, 150, 7,  'down', false),(100, 175, 4,  'down', false),
  (100, 200, NULL, NULL, true),
  (150, 50,  8,  'up',   false),(150, 75,  8,  'up',   false),(150, 100, 8,  'up',   false),
  (150, 125, 9,  'up',   false),(150, 150, 10, NULL,   false),(150, 175, 7,  'down', false),
  (150, 200, 4,  'down', false),(150, 225, NULL, NULL, true)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'コウソモデル1897')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (50,  50,  10, NULL::text, false),(50,  75,  10, 'down', false),(50,  100, 9,  'down', false),
  (50,  125, 7,  'down', false),(50,  150, 4,  'down', false),(50,  175, NULL, NULL, true),
  (100, 50,  9,  'up',   false),(100, 75,  10, 'up',   false),(100, 100, 10, NULL,   false),
  (100, 125, 9,  'down', false),(100, 150, 6,  'down', false),(100, 175, 3,  'down', false),
  (100, 200, NULL, NULL, true),
  (150, 50,  8,  'up',   false),(150, 75,  8,  'up',   false),(150, 100, 8,  'up',   false),
  (150, 125, 9,  'up',   false),(150, 150, 10, 'down', false),(150, 175, 6,  'down', false),
  (150, 200, 3,  'down', false),(150, 225, NULL, NULL, true)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'ゴピ10Gグランド')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (50,  50,  10, 'up'::text, false),(50,  75,  10, NULL,   false),(50,  100, 9,  'down', false),
  (50,  125, 8,  'down', false),(50,  150, 5,  'down', false),(50,  175, 2,  'down', false),
  (50,  200, NULL, NULL, true),
  (100, 50,  9,  'up',   false),(100, 75,  9,  'up',   false),(100, 100, 10, 'up',   false),
  (100, 125, 10, 'down', false),(100, 150, 8,  'down', false),(100, 175, 5,  'down', false),
  (100, 200, 1,  'down', false),(100, 225, NULL, NULL, true),
  (150, 50,  8,  'up',   false),(150, 75,  8,  'up',   false),(150, 100, 8,  'up',   false),
  (150, 125, 9,  'up',   false),(150, 150, 10, NULL,   false),(150, 175, 8,  'down', false),
  (150, 200, 5,  'down', false),(150, 225, NULL, NULL, true)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'ベネルハグ12G')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (50,  50,  10, NULL::text, false),(50,  75,  10, 'down', false),(50,  100, 9,  'down', false),
  (50,  125, 7,  'down', false),(50,  150, 4,  'down', false),(50,  175, 1,  'down', false),
  (50,  200, NULL, NULL, true),
  (100, 50,  9,  'up',   false),(100, 75,  10, 'up',   false),(100, 100, 10, NULL,   false),
  (100, 125, 9,  'down', false),(100, 150, 7,  'down', false),(100, 175, 4,  'down', false),
  (100, 200, NULL, NULL, true),
  (150, 50,  8,  'up',   false),(150, 75,  8,  'up',   false),(150, 100, 8,  'up',   false),
  (150, 125, 9,  'up',   false),(150, 150, 10, NULL,   false),(150, 175, 7,  'down', false),
  (150, 200, 4,  'down', false),(150, 225, NULL, NULL, true)
) v(z,r,s,d,o);

-- グリェルク・ドリリングライフル: two ammo types
WITH g AS (SELECT id FROM firearms WHERE name = 'グリェルク・ドリリングライフル')
INSERT INTO firearm_ballistics (firearm_id, ammo_note, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.n, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  -- 9.3X74R (rifle ranges)
  ('9.3X74R'::text, 50,  50,  10, NULL::text, false),('9.3X74R', 50,  100, 10, 'down', false),
  ('9.3X74R', 50,  150, 8,  'down', false),('9.3X74R', 50,  200, 6,  'down', false),
  ('9.3X74R', 50,  250, 3,  'down', false),('9.3X74R', 50,  300, NULL, NULL, true),
  ('9.3X74R', 100, 50,  10, NULL,   false),('9.3X74R', 100, 100, 10, NULL,   false),
  ('9.3X74R', 100, 150, 9,  'down', false),('9.3X74R', 100, 200, 6,  'down', false),
  ('9.3X74R', 100, 250, 4,  'down', false),('9.3X74R', 100, 300, NULL, NULL, true),
  ('9.3X74R', 150, 50,  10, 'up',   false),('9.3X74R', 150, 100, 10, 'up',   false),
  ('9.3X74R', 150, 150, 10, NULL,   false),('9.3X74R', 150, 200, 9,  'down', false),
  ('9.3X74R', 150, 250, 6,  'down', false),('9.3X74R', 150, 300, 3,  'down', false),
  ('9.3X74R', 150, 350, NULL, NULL, true),
  -- 16GA slug (shotgun ranges)
  ('16GA', 50,  50,  10, NULL,   false),('16GA', 50,  75,  10, 'down', false),
  ('16GA', 50,  100, 9,  'down', false),('16GA', 50,  125, 7,  'down', false),
  ('16GA', 50,  150, 4,  'down', false),('16GA', 50,  175, NULL, NULL, true),
  ('16GA', 100, 50,  9,  'up',   false),('16GA', 100, 75,  10, 'up',   false),
  ('16GA', 100, 100, 10, NULL,   false),('16GA', 100, 125, 9,  'down', false),
  ('16GA', 100, 150, 6,  'down', false),('16GA', 100, 175, 3,  'down', false),
  ('16GA', 100, 200, NULL, NULL, true),
  ('16GA', 150, 50,  8,  'up',   false),('16GA', 150, 75,  8,  'up',   false),
  ('16GA', 150, 100, 8,  'up',   false),('16GA', 150, 125, 9,  'up',   false),
  ('16GA', 150, 150, 10, 'down', false),('16GA', 150, 175, 6,  'down', false),
  ('16GA', 150, 200, 3,  'down', false),('16GA', 150, 225, NULL, NULL, true)
) v(n,z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'ストレッカーSXS20G')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (50,  50,  10, 'up'::text, false),(50,  75,  10, 'down', false),(50,  100, 9,  'down', false),
  (50,  125, 8,  'down', false),(50,  150, 5,  'down', false),(50,  175, 2,  'down', false),
  (50,  200, NULL, NULL, true),
  (100, 50,  9,  'up',   false),(100, 75,  10, 'up',   false),(100, 100, 10, NULL,   false),
  (100, 125, 9,  'down', false),(100, 150, 7,  'down', false),(100, 175, 4,  'down', false),
  (100, 200, NULL, NULL, true),
  (150, 50,  8,  'up',   false),(150, 75,  8,  'up',   false),(150, 100, 8,  'up',   false),
  (150, 125, 9,  'up',   false),(150, 150, 10, NULL,   false),(150, 175, 8,  'down', false),
  (150, 200, 5,  'down', false),(150, 225, NULL, NULL, true)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'ノルディン20SA')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (50,  50,  10, 'up'::text, false),(50,  75,  10, 'down', false),(50,  100, 9,  'down', false),
  (50,  125, 8,  'down', false),(50,  150, 5,  'down', false),(50,  175, 2,  'down', false),
  (50,  200, NULL, NULL, true),
  (100, 50,  9,  'up',   false),(100, 75,  10, 'up',   false),(100, 100, 10, NULL,   false),
  (100, 125, 9,  'down', false),(100, 150, 7,  'down', false),(100, 175, 4,  'down', false),
  (100, 200, NULL, NULL, true),
  (150, 50,  8,  'up',   false),(150, 75,  8,  'up',   false),(150, 100, 8,  'up',   false),
  (150, 125, 9,  'up',   false),(150, 150, 10, NULL,   false),(150, 175, 8,  'down', false),
  (150, 200, 5,  'down', false),(150, 225, NULL, NULL, true)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'ミラーモデル1891')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (50,  50,  10, NULL::text, false),(50,  75,  10, 'down', false),(50,  100, 9,  'down', false),
  (50,  125, 7,  'down', false),(50,  150, 4,  'down', false),(50,  175, 1,  'down', false),
  (50,  200, NULL, NULL, true),
  (100, 50,  9,  'up',   false),(100, 75,  10, 'up',   false),(100, 100, 10, NULL,   false),
  (100, 125, 9,  'down', false),(100, 150, 7,  'down', false),(100, 175, 4,  'down', false),
  (100, 200, NULL, NULL, true),
  (150, 50,  8,  'up',   false),(150, 75,  8,  'up',   false),(150, 100, 8,  'up',   false),
  (150, 125, 9,  'up',   false),(150, 150, 10, 'down', false),(150, 175, 7,  'down', false),
  (150, 200, 4,  'down', false),(150, 225, NULL, NULL, true)
) v(z,r,s,d,o);

WITH g AS (SELECT id FROM firearms WHERE name = 'ストランドベリ10GAエグゼクティブ')
INSERT INTO firearm_ballistics (firearm_id, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  (50,  50,  10, 'up'::text, false),(50,  75,  10, NULL,   false),(50,  100, 9,  'down', false),
  (50,  125, 8,  'down', false),(50,  150, 5,  'down', false),(50,  175, 2,  'down', false),
  (50,  200, NULL, NULL, true),
  (100, 50,  9,  'up',   false),(100, 75,  9,  'up',   false),(100, 100, 10, 'up',   false),
  (100, 125, 10, 'down', false),(100, 150, 8,  'down', false),(100, 175, 5,  'down', false),
  (100, 200, 1,  'down', false),(100, 225, NULL, NULL, true),
  (150, 50,  8,  'up',   false),(150, 75,  8,  'up',   false),(150, 100, 8,  'up',   false),
  (150, 125, 9,  'up',   false),(150, 150, 10, NULL,   false),(150, 175, 8,  'down', false),
  (150, 200, 5,  'down', false),(150, 225, NULL, NULL, true)
) v(z,r,s,d,o);

-- キャシディ・コンビネーション・ショットガン: two ammo types
WITH g AS (SELECT id FROM firearms WHERE name = 'キャシディ・コンビネーション・ショットガン')
INSERT INTO firearm_ballistics (firearm_id, ammo_note, zero_distance, range_distance, score, direction, is_out)
SELECT g.id, v.n, v.z, v.r, v.s, v.d, v.o FROM g, (VALUES
  -- 12GA slug (shotgun ranges)
  ('12GA'::text, 50,  50,  10, NULL::text, false),('12GA', 50,  75,  10, 'down', false),
  ('12GA', 50,  100, 9,  'down', false),('12GA', 50,  125, 7,  'down', false),
  ('12GA', 50,  150, 4,  'down', false),('12GA', 50,  175, 1,  'down', false),
  ('12GA', 50,  200, NULL, NULL, true),
  ('12GA', 100, 50,  9,  'up',   false),('12GA', 100, 75,  10, 'up',   false),
  ('12GA', 100, 100, 10, NULL,   false),('12GA', 100, 125, 9,  'down', false),
  ('12GA', 100, 150, 7,  'down', false),('12GA', 100, 175, 4,  'down', false),
  ('12GA', 100, 200, NULL, NULL, true),
  ('12GA', 150, 50,  8,  'up',   false),('12GA', 150, 75,  8,  'up',   false),
  ('12GA', 150, 100, 8,  'up',   false),('12GA', 150, 125, 9,  'up',   false),
  ('12GA', 150, 150, 10, NULL,   false),('12GA', 150, 175, 7,  'down', false),
  ('12GA', 150, 200, 4,  'down', false),('12GA', 150, 225, NULL, NULL, true),
  -- .22 Magnum (rifle ranges)
  ('.22MAG', 50,  50,  10, NULL,   false),('.22MAG', 50,  100, 10, 'down', false),
  ('.22MAG', 50,  150, 7,  NULL,   false),('.22MAG', 50,  200, 5,  NULL,   false),
  ('.22MAG', 50,  250, NULL, NULL, true),
  ('.22MAG', 100, 50,  10, NULL,   false),('.22MAG', 100, 100, 10, NULL,   false),
  ('.22MAG', 100, 150, 9,  'down', false),('.22MAG', 100, 200, 6,  'down', false),
  ('.22MAG', 100, 250, NULL, NULL, true),
  ('.22MAG', 150, 50,  10, 'up',   false),('.22MAG', 150, 100, 9,  'up',   false),
  ('.22MAG', 150, 150, 10, NULL,   false),('.22MAG', 150, 200, 7,  NULL,   false),
  ('.22MAG', 150, 250, 1,  'down', false),('.22MAG', 150, 300, NULL, NULL, true)
) v(n,z,r,s,d,o);

-- Notify PostgREST to reload schema cache
NOTIFY pgrst, 'reload schema';
