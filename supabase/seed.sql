-- =====================================================
-- SEED DATA for The Hunter: Call of the Wild Simulator
-- Source: https://w.atwiki.jp/thehunter_cotw/
-- =====================================================

-- =====================================================
-- FIREARMS
-- =====================================================

-- Rifles
INSERT INTO firearms (name, type, weight, description) VALUES
('Hudzik .30-06 Solokhin MN1890', 'rifle', 3.00, 'クラス4-8対応のボルトアクションライフル。汎用性が高い。'),
('Kvajon Dovre F2-98', 'rifle', 3.50, 'クラス4-8対応の高精度ボルトアクションライフル。'),
('.30-06 Bolt Action Rifle', 'rifle', 3.00, 'クラス4-8の動物に対応する標準的なライフル。'),
('Cacciatore .308 Varminter Rifle', 'rifle', 2.50, 'クラス1-4の小型動物に適したバーミンターライフル。'),
('Ranger 243, Bolt Action Rifle', 'rifle', 2.80, 'クラス1-4の動物に適したライフル。'),
('Virant .22 Anschütz 1780 D FL', 'rifle', 2.20, 'クラス1-3の小型動物専用の小口径ライフル。'),
('.243 Bolt Action Rifle', 'rifle', 2.80, 'クラス2-5の動物に対応する中口径ライフル。'),
('Strecker SxS 20GA', 'rifle', 3.00, 'クラス4-9の大型動物に使用する大口径ライフル。'),
('Kullberg .375 BLR', 'rifle', 3.80, 'クラス7-9の大型動物専用の強力なライフル。'),
('.45-70 Lever Action Rifle', 'rifle', 3.20, 'クラス6-8の動物に適したレバーアクションライフル。'),
('Coachmate Lever .45-70', 'rifle', 3.20, 'クラス6-8対応のクラシックなレバーアクションライフル。'),
('Miller Model 1891', 'rifle', 3.50, 'クラス4-8対応の歴史的なライフル。');

-- Shotguns
INSERT INTO firearms (name, type, weight, description) VALUES
('Cacciatore 12GA Field', 'shotgun', 3.50, 'クラス1-9対応の汎用ショットガン。'),
('Cacciatore 20GA Semi-Auto', 'shotgun', 3.20, 'クラス1-5対応の軽量セミオートショットガン。'),
('Browning Maxus Sporting', 'shotgun', 3.40, 'クラス1-9対応の高品質ショットガン。'),
('Bearclaw Lite CB-60', 'shotgun', 3.80, 'クラス1-9対応の重装備ショットガン。'),
('Strecker SxS 20GA', 'shotgun', 3.00, 'クラス1-5対応のサイドバイサイドショットガン。');

-- Handguns
INSERT INTO firearms (name, type, weight, description) VALUES
('.357 Revolver', 'handgun', 1.00, 'クラス2-5対応のリボルバー。サイドアームとして使用。'),
('.44 Magnum Revolver', 'handgun', 1.20, 'クラス4-8対応の強力なリボルバー。'),
('9mm Pistol', 'handgun', 0.80, 'クラス1-3対応の軽量ピストル。'),
('.45 ACP Pistol', 'handgun', 1.00, 'クラス2-5対応の標準的なピストル。'),
('Zoraki R1 2.5" .44 Revolver', 'handgun', 1.20, 'クラス4-8対応の短銃身リボルバー。');

-- Bows
INSERT INTO firearms (name, type, weight, description) VALUES
('Compound Bow', 'bow', 2.00, 'クラス2-5対応のコンパウンドボウ。静音性が高い。'),
('Bearclaw Lite CB-60', 'bow', 2.50, 'クラス5-9対応の高出力コンパウンドボウ。'),
('Traditional Recurve Bow', 'bow', 1.80, 'クラス2-4対応の伝統的なリカーブボウ。'),
('Carbon Recurve Bow', 'bow', 2.00, 'クラス2-5対応の軽量カーボンリカーブボウ。');

-- =====================================================
-- AMMO
-- =====================================================

-- Rifle ammo
INSERT INTO ammo (name, weight, class_min, class_max, description) VALUES
('.30-06 FMJ', 0.10, 4, 8, 'クラス4-8対応のフルメタルジャケット弾。'),
('.30-06 Polymer Tip', 0.10, 4, 8, 'クラス4-8対応のポリマーチップ弾。高い精度。'),
('.30-06 Soft Point', 0.10, 5, 8, 'クラス5-8対応のソフトポイント弾。'),
('.308 FMJ', 0.10, 3, 7, 'クラス3-7対応のフルメタルジャケット弾。'),
('.308 Polymer Tip', 0.10, 3, 7, 'クラス3-7対応のポリマーチップ弾。'),
('.243 FMJ', 0.10, 2, 5, 'クラス2-5対応の.243口径弾。'),
('.243 Polymer Tip', 0.10, 2, 5, 'クラス2-5対応の.243口径弾。高精度。'),
('.22 LR FMJ', 0.10, 1, 3, 'クラス1-3対応の小口径弾。'),
('.375 FMJ', 0.10, 7, 9, 'クラス7-9対応の大口径弾。大型動物専用。'),
('.375 Soft Point', 0.10, 7, 9, 'クラス7-9対応のソフトポイント弾。'),
('.45-70 FMJ', 0.10, 6, 8, 'クラス6-8対応の.45-70口径弾。');

-- Shotgun ammo
INSERT INTO ammo (name, weight, class_min, class_max, description) VALUES
('12GA Lead Shot', 0.10, 1, 5, 'クラス1-5対応の12ゲージバードショット。'),
('12GA Buckshot', 0.10, 2, 6, 'クラス2-6対応の12ゲージバックショット。'),
('12GA Slug', 0.10, 3, 9, 'クラス3-9対応の12ゲージスラグ。高威力。'),
('20GA Lead Shot', 0.10, 1, 4, 'クラス1-4対応の20ゲージバードショット。'),
('20GA Slug', 0.10, 2, 7, 'クラス2-7対応の20ゲージスラグ。');

-- Handgun ammo
INSERT INTO ammo (name, weight, class_min, class_max, description) VALUES
('.357 FMJ', 0.10, 2, 5, 'クラス2-5対応の.357マグナム弾。'),
('.357 Soft Point', 0.10, 2, 5, 'クラス2-5対応のソフトポイント弾。'),
('.44 Magnum FMJ', 0.10, 4, 8, 'クラス4-8対応の.44マグナム弾。'),
('.44 Magnum Soft Point', 0.10, 4, 8, 'クラス4-8対応のソフトポイント弾。'),
('9mm FMJ', 0.10, 1, 3, 'クラス1-3対応の9mm弾。'),
('.45 ACP FMJ', 0.10, 2, 5, 'クラス2-5対応の.45ACP弾。');

-- Bow ammo (arrows)
INSERT INTO ammo (name, weight, class_min, class_max, description) VALUES
('Carbon Arrow', 0.20, 2, 5, 'クラス2-5対応の標準カーボン矢。'),
('Large Game Arrow', 0.20, 5, 9, 'クラス5-9対応の大型動物用矢。'),
('Small Game Arrow', 0.20, 1, 3, 'クラス1-3対応の小型動物用矢（ブロードヘッド）。'),
('Judo Arrow', 0.20, 1, 2, 'クラス1-2対応の競技用矢。');

-- =====================================================
-- FIREARM-AMMO RELATIONSHIPS
-- =====================================================

-- Link rifles to ammo (using subqueries)
INSERT INTO firearm_ammo (firearm_id, ammo_id)
SELECT f.id, a.id FROM firearms f, ammo a
WHERE f.name LIKE '%Hudzik%' AND a.name LIKE '%.30-06%'
ON CONFLICT DO NOTHING;

INSERT INTO firearm_ammo (firearm_id, ammo_id)
SELECT f.id, a.id FROM firearms f, ammo a
WHERE f.name = '.30-06 Bolt Action Rifle' AND a.name LIKE '%.30-06%'
ON CONFLICT DO NOTHING;

INSERT INTO firearm_ammo (firearm_id, ammo_id)
SELECT f.id, a.id FROM firearms f, ammo a
WHERE f.name LIKE '%Cacciatore .308%' AND a.name LIKE '%.308%'
ON CONFLICT DO NOTHING;

INSERT INTO firearm_ammo (firearm_id, ammo_id)
SELECT f.id, a.id FROM firearms f, ammo a
WHERE f.name LIKE '%Ranger 243%' AND a.name LIKE '%.243%'
ON CONFLICT DO NOTHING;

INSERT INTO firearm_ammo (firearm_id, ammo_id)
SELECT f.id, a.id FROM firearms f, ammo a
WHERE f.name LIKE '%Virant%' AND a.name LIKE '%.22%'
ON CONFLICT DO NOTHING;

INSERT INTO firearm_ammo (firearm_id, ammo_id)
SELECT f.id, a.id FROM firearms f, ammo a
WHERE f.name = '.243 Bolt Action Rifle' AND a.name LIKE '%.243%'
ON CONFLICT DO NOTHING;

INSERT INTO firearm_ammo (firearm_id, ammo_id)
SELECT f.id, a.id FROM firearms f, ammo a
WHERE f.name LIKE '%Kullberg%' AND a.name LIKE '%.375%'
ON CONFLICT DO NOTHING;

INSERT INTO firearm_ammo (firearm_id, ammo_id)
SELECT f.id, a.id FROM firearms f, ammo a
WHERE f.name LIKE '%.45-70%' AND a.name LIKE '%.45-70%'
ON CONFLICT DO NOTHING;

INSERT INTO firearm_ammo (firearm_id, ammo_id)
SELECT f.id, a.id FROM firearms f, ammo a
WHERE f.name LIKE '%Coachmate%' AND a.name LIKE '%.45-70%'
ON CONFLICT DO NOTHING;

-- Link shotguns to ammo
INSERT INTO firearm_ammo (firearm_id, ammo_id)
SELECT f.id, a.id FROM firearms f, ammo a
WHERE f.type = 'shotgun' AND f.name LIKE '%12GA%' AND a.name LIKE '12GA%'
ON CONFLICT DO NOTHING;

INSERT INTO firearm_ammo (firearm_id, ammo_id)
SELECT f.id, a.id FROM firearms f, ammo a
WHERE f.type = 'shotgun' AND f.name LIKE '%20GA%' AND a.name LIKE '20GA%'
ON CONFLICT DO NOTHING;

INSERT INTO firearm_ammo (firearm_id, ammo_id)
SELECT f.id, a.id FROM firearms f, ammo a
WHERE f.type = 'shotgun' AND f.name = 'Browning Maxus Sporting' AND a.name LIKE '12GA%'
ON CONFLICT DO NOTHING;

INSERT INTO firearm_ammo (firearm_id, ammo_id)
SELECT f.id, a.id FROM firearms f, ammo a
WHERE f.type = 'shotgun' AND f.name = 'Bearclaw Lite CB-60' AND a.name LIKE '12GA%'
ON CONFLICT DO NOTHING;

-- Link handguns to ammo
INSERT INTO firearm_ammo (firearm_id, ammo_id)
SELECT f.id, a.id FROM firearms f, ammo a
WHERE f.name = '.357 Revolver' AND a.name LIKE '.357%'
ON CONFLICT DO NOTHING;

INSERT INTO firearm_ammo (firearm_id, ammo_id)
SELECT f.id, a.id FROM firearms f, ammo a
WHERE f.name LIKE '%Zoraki%' AND a.name LIKE '.44 Magnum%'
ON CONFLICT DO NOTHING;

INSERT INTO firearm_ammo (firearm_id, ammo_id)
SELECT f.id, a.id FROM firearms f, ammo a
WHERE f.name = '.44 Magnum Revolver' AND a.name LIKE '.44 Magnum%'
ON CONFLICT DO NOTHING;

INSERT INTO firearm_ammo (firearm_id, ammo_id)
SELECT f.id, a.id FROM firearms f, ammo a
WHERE f.name = '9mm Pistol' AND a.name LIKE '9mm%'
ON CONFLICT DO NOTHING;

INSERT INTO firearm_ammo (firearm_id, ammo_id)
SELECT f.id, a.id FROM firearms f, ammo a
WHERE f.name = '.45 ACP Pistol' AND a.name LIKE '.45 ACP%'
ON CONFLICT DO NOTHING;

-- Link bows to arrows
INSERT INTO firearm_ammo (firearm_id, ammo_id)
SELECT f.id, a.id FROM firearms f, ammo a
WHERE f.type = 'bow' AND a.name LIKE '%Arrow%'
ON CONFLICT DO NOTHING;

-- =====================================================
-- ITEMS (non-firearms)
-- =====================================================

-- Backpacks
INSERT INTO items (name, category, weight, weight_bonus, description) VALUES
('バックパック（小）', 'backpack', 1.00, 3.00, '所持重量を+3増加させる。バックパックは一度に一つだけ装備可能。'),
('バックパック（中）', 'backpack', 1.00, 6.00, '所持重量を+6増加させる。バックパックは一度に一つだけ装備可能。'),
('バックパック（大）', 'backpack', 1.00, 9.00, '所持重量を+9増加させる。バックパックは一度に一つだけ装備可能。');

-- Calls / Whistles (呼び笛)
-- Columns: name, category, weight, weight_bonus, description, target_animals, effective_distance, attraction, effective_duration, price, unlock_level
INSERT INTO items (name, category, weight, weight_bonus, description, target_animals, effective_distance, attraction, effective_duration, price, unlock_level) VALUES
('ノロジカ用呼び笛',              'call', 0.50, 0, '初期装備。ノロジカ、インドキョンをおびき寄せるための道具。',
 'ノロジカ、インドキョン', 200, 40, 90, 0, 0),

('シカ用"鳴き声"式呼び笛',       'call', 0.50, 0, '初期装備。他の笛より有効距離が短いが、誘い出せる確率が高い。',
 'オジロジカ、オグロジカ、ミュールジカ、ニホンジカ', 150, 50, 90, 0, 0),

('捕食動物用"ジャックウサギ"式呼び笛', 'call', 0.50, 0, '初期装備。主に小型/中型の肉食獣をおびき寄せるための道具。',
 'アカギツネ、ハイイロギツネ、コヨーテ、オオヤマネコ、ヨコスジジャッカル、ライオン、ハイイロオオカミ、イベリアオオカミ、メキシカンボブキャット、クビワペッカリー、チベットスナギツネ', 200, 40, 90, 0, 0),

('枝角ラトラー',                  'call', 0.50, 0, 'ダマジカ、トナカイ、カリブーなどをおびき寄せるための道具。',
 'ダマジカ、トナカイ、カリブー、レッサークーズー、オリックス、ブラックバック、バラシンガジカ', 200, 40, 90, 6000, 5),

('イノシシ用呼笛',                'call', 0.50, 0, 'イノシシ、イボイノシシ、野生ブタ、クビワペッカリーをおびき寄せるための道具。',
 'イノシシ、イボイノシシ、野生ブタ、クビワペッカリー', 200, 40, 90, 6000, 13),

('エルク用呼笛',                  'call', 0.50, 0, 'アメリカアカシカ、ロッキーマウンテンエルクをおびき寄せるための道具。',
 'アメリカアカシカ、ロッキーマウンテンエルク', 200, 40, 90, 6000, 15),

('捕食動物"苦しむ子鹿"式呼び笛', 'call', 0.50, 0, 'クマ、ピューマ、ライオン、オオカミ、ベンガルトラをおびき寄せるための道具。',
 'クマ、ピューマ、ライオン、ハイイロオオカミ、イベリアオオカミ、ベンガルトラ', 200, 40, 90, 6000, 25),

('アカシカ用呼び笛',              'call', 0.50, 0, 'アカシカ、ニホンジカをおびき寄せるための道具。',
 'アカシカ、ニホンジカ', 200, 40, 90, 6000, 27),

('ヘラジカ用呼び笛',              'call', 0.50, 0, 'ヘラジカをおびき寄せるための道具。',
 'ヘラジカ', 200, 40, 90, 6000, 35),

('シカ用"うなり声"式呼び笛',     'call', 0.50, 0, '"鳴き声式"より有効範囲が広いが、誘い出せる確率が低下している。',
 'オジロジカ、オグロジカ、ニホンジカ', 250, 25, 90, 6000, 37),

('ショートリード・カナダガン用呼び笛', 'call', 0.50, 0, 'カナダガンをおびき寄せるための道具。',
 'カナダガン', 500, 40, 90, 6000, 0),

('ビーコンデラックス・カモ用呼び笛', 'call', 0.50, 0, 'マガモ、アカシマアジなど5種のカモをおびき寄せるための道具。',
 'マガモ、アカシマアジ、ホオジロガモ、キンクロハジロ、シノリガモ', 500, 40, 25, 6000, 0),

('雄ジカ用"荒い鼻息"式呼び笛',  'call', 0.50, 0, 'DLC：ヴルホンガ・サバンナ。オジロジカ、スプリングボックなどをおびき寄せる。',
 'オジロジカ、スプリングボック、オグロヌー、レッサークーズー、ニホンジカ、ニルガイ', 200, 40, 90, 0, 0),

('アクシスジカ用"叫び声"式呼び笛', 'call', 0.50, 0, 'DLC：パルケ・フェルナンド。アクシスジカをおびき寄せるための道具。',
 'アクシスジカ', 200, 40, 90, 6000, 0),

('野生の七面鳥用呼び笛（クロウ）', 'call', 0.50, 0, 'DLC：テ・アワロア。七面鳥に鳴き返しをさせて位置を把握するための道具。',
 '七面鳥', 200, 50, 90, 6000, 0),

('野生の七面鳥用呼び笛（マウス）', 'call', 0.50, 0, 'DLC：テ・アワロア。七面鳥をおびき寄せるための道具。デコイと併用が効果的。',
 '七面鳥', 200, 40, 90, 6000, 0),

('アライグマ用"金切り声"式呼び笛', 'call', 0.50, 0, 'DLC：ミシシッピ・エーカーズ。通常より有効範囲が広く有効時間が短い。',
 'アライグマ', 500, 40, 25, 6000, 0),

('エゾライチョウ用呼び笛',        'call', 0.50, 0, 'DLC：レボントゥリ海岸。エゾライチョウをおびき寄せるための道具。',
 'エゾライチョウ', 500, 40, 25, 6000, 0),

('ビーコンデラックス・コガモ用呼び笛', 'call', 0.50, 0, 'DLC：レボントゥリ海岸またはニューイングランド山地。',
 'コガモ、アメリカコガモ', 500, 40, 25, 6000, 0),

('ビーコンデラックス・ハイイロガン用呼び笛', 'call', 0.50, 0, 'DLC：レボントゥリ海岸。ハイイロガンをおびき寄せるための道具。',
 'ハイイロガン', 500, 40, 25, 6000, 0),

('ビーコンデラックス・ヒシクイ用呼び笛', 'call', 0.50, 0, 'DLC：レボントゥリ海岸。ツンドラヒシクイをおびき寄せるための道具。',
 'ツンドラヒシクイ', 500, 40, 25, 6000, 0),

('ビーコンデラックス・ヒドリガモ用呼び笛', 'call', 0.50, 0, 'DLC：レボントゥリ海岸。ヒドリガモをおびき寄せるための道具。',
 'ヒドリガモ', 500, 40, 25, 6000, 0),

('FOXPRO X360電子呼び笛',         'call', 3.50, 0, 'DLC：Ambusher Pack。地面に設置しリモコン操作。1マップに1個まで設置可能。2種同時に呼べる。射撃音検知で停止機能付き。',
 'すべての呼び寄せ可能な種', 200, 40, NULL, 0, 0);

-- Scent items (匂いアイテム)
-- Columns: name, category, weight, weight_bonus, description, target_animals, effective_distance, attraction, effective_duration, price, unlock_level
INSERT INTO items (name, category, weight, weight_bonus, description, target_animals, effective_distance, attraction, effective_duration, price, unlock_level) VALUES
('ノロジカの匂い',       'scent', 0.5, 0, 'ノロジカを誘引する匂いアイテム。',         'ノロジカ',           200, 50, 300, 1500, 7),
('アカシカの匂い',       'scent', 0.5, 0, 'アカシカを誘引する匂いアイテム。',         'アカシカ',           200, 50, 300, 1500, 17),
('ヘラジカの匂い',       'scent', 0.5, 0, 'ヘラジカを誘引する匂いアイテム。',         'ヘラジカ',           200, 50, 300, 1500, 19),
('エルクの匂い',         'scent', 0.5, 0, 'アメリカアカシカを誘引する匂いアイテム。', 'アメリカアカシカ',   200, 50, 300, 1500, 21),
('オグロジカの匂い',     'scent', 0.5, 0, 'オグロジカを誘引する匂いアイテム。',       'オグロジカ',         200, 50, 300, 1500, 23),
('オジロジカの匂い',     'scent', 0.5, 0, 'オジロジカを誘引する匂いアイテム。',       'オジロジカ',         200, 50, 300, 1500, 31),
('イノシシの匂い',       'scent', 0.5, 0, 'イノシシを誘引する匂いアイテム。',         'イノシシ',           200, 50, 300, 1500, 33),
('ジャコウジカの匂い',   'scent', 0.5, 0, 'シベリアジャコウジカを誘引する匂いアイテム。', 'シベリアジャコウジカ', 200, 50, 300, 1500, 0),
('ミュールジカの匂い',   'scent', 0.5, 0, 'ミュールジカを誘引する匂いアイテム。',     'ミュールジカ',       200, 50, 300, 1500, 0);

-- Equipment (装備)
-- Columns: name, category, weight, weight_bonus, description, item_type, price, unlock_level
INSERT INTO items (name, category, weight, weight_bonus, description, item_type, price, unlock_level) VALUES
('ヴァンテージ 8X42',       'equipment', 1.0, 0, NULL, '双眼鏡', 0,     0),
('ベンチャー 5x30 測距儀',  'equipment', 1.0, 0, NULL, '双眼鏡', 12000, 11),
('エイペックスビュー 7X42', 'equipment', 1.0, 0, NULL, '双眼鏡', 24000, 29),
('救命キット',              'equipment', 0.5, 0, NULL, 'その他', 1500,  9),
('消臭剤',                  'equipment', 0.5, 0, NULL, 'その他', 3000,  0);

-- Structures (構造物)
-- Columns: name, category, weight, weight_bonus, description, price, reduces_hunting_pressure, concealment_rate, max_installations, disturbance_radius
-- Note: Map設置items have no carry weight (0) and no max_installations/disturbance_radius (NULL)
INSERT INTO items (name, category, weight, weight_bonus, description, price, reduces_hunting_pressure, concealment_rate, max_installations, disturbance_radius) VALUES
('狩猟スタンド（Map設置）',          'structure', 0, 0, 'マップに事前設置された狩猟スタンド。重量なし。',         2100,  true,  80, NULL, NULL),
('グラウンド・ブラインド（Map設置）', 'structure', 0, 0, 'マップに事前設置されたグラウンドブラインド。重量なし。', 1700,  true,  80, NULL, NULL),
('グラウンド・ブラインド',            'structure', 6, 0, '持ち運び可能なグラウンドブラインド。隠蔽率80%。',        8000,  true,  80, 16,   250),
('ウォーターフォウル・ブラインド',    'structure', 6, 0, '水鳥猟向けブラインド。隠蔽率80%。',                      8000,  true,  80, 16,   250),
('三脚',                              'structure', 6, 0, '銃器を安定させる三脚。隠蔽率80%。',                      16000, true,  80, 32,   130),
('ツリースタンド',                    'structure', 6, 0, '木に取り付けて高所から狩猟するためのスタンド。',         16000, true,  80, 32,   100),
('レイアウトブラインド（地上型）',    'structure', 3, 0, '地上設置型の低姿勢ブラインド。隠蔽率80%。',             16000, true,  80, 16,   100),
('レイアウトブラインド（水上型）',    'structure', 3, 0, '水上設置型の低姿勢ブラインド。隠蔽率80%。',             16000, true,  80, 16,   100),
('テント',                            'structure', 6, 0, 'フィールドに設置できる携帯テント。昼夜サイクルをスキップ可能。', 16000, false, NULL, 16, 250);

-- =====================================================
-- HUNTING AREAS
-- =====================================================

INSERT INTO hunting_areas (name, description) VALUES
('ヒルシュフェルデン保護区', 'ドイツの丘陵地帯。ヨーロッパ産の鹿や猪が生息。'),
('レイトン湖水地方', 'アメリカ・ワシントン州の山岳・湖水地帯。多様な北米野生動物が生息。'),
('メドヴェド＝タイガ国立公園', 'ロシア・シベリアの広大なタイガ地帯。北方の大型獣が生息。'),
('ヴルホンガ・サバンナ', '南アフリカのサバンナ。アフリカの野生動物が生息。'),
('パルケ・フェルナンド', '南アメリカの熱帯雨林。希少な南米動物が生息。'),
('ユーコンバレー自然保護区', 'カナダ・ユーコン準州の大自然。北米の大型獣が生息。'),
('クアトロ・コリナス狩猟保護区', 'スペインの農村地帯。地中海性の野生動物が生息。'),
('シルバーリッジ・ピークス', 'アメリカ・コロラド州の高山地帯。高山動物が生息。'),
('テ・アワロア国立公園', 'ニュージーランドの森林地帯。固有の動物が生息。'),
('渓谷牧場', 'アメリカ南部の牧場地帯。多様な野生動物が生息。'),
('ミシシッピ・エーカーズ保護区', 'アメリカ・ミシシッピ州の湿地帯。南部固有の動物が生息。'),
('レボントゥリ海岸', 'フィンランドの海岸地帯。北欧の野鳥や動物が生息。'),
('ニューイングランド山地', 'アメリカ北東部の山岳地帯。東部固有の動物が生息。'),
('エメラルド海岸', 'アイルランドの沿岸地帯。ヨーロッパの野生動物が生息。'),
('スンダルパタン保護区', 'インドの森林保護区。アジアの大型獣が生息。'),
('ザルツヴィーゼン公園', 'オーストリアの草原地帯。ヨーロッパの野生動物が生息。'),
('アスキー・リッジ狩猟保護区', 'スコットランドの荒野。ヨーロッパ北部の動物が生息。'),
('トール・ナン・シアン狩猟場', 'スコットランド高地の狩猟場。固有の野生動物が生息。');

-- =====================================================
-- ANIMALS
-- =====================================================

INSERT INTO animals (name, level_min, level_max) VALUES
-- Level 1
('アナウサギ', 1, 1),
('カナダガン', 1, 1),
('コウライキジ', 1, 1),
('オジロジャックウサギ', 1, 1),
('マガモ', 1, 1),
('メリアム・シチメンチョウ', 1, 1),
('ヨーロッパオオライチョウ', 1, 1),
('スクラブノウサギ', 1, 1),
('ヒドリガモ', 1, 1),
('アカシマアジ', 1, 1),
('シノリガモ', 1, 1),
('ヤブノウサギ', 1, 1),
('リオ・グランデ・シチメンチョウ', 1, 1),
('アンテロープジャックウサギ', 1, 1),
('イースタン・ワイルド・ターキー', 1, 1),
('アメリカコガモ', 1, 1),
('コリンウズラ', 1, 1),
('トウブワタオウサギ', 1, 1),
('イワライチョウ', 1, 1),
('エゾライチョウ', 1, 1),
('カラフトライチョウ', 1, 1),
('キンクロハジロ', 1, 1),
('クロライチョウ', 1, 1),
('コガモ', 1, 1),
('ツンドラヒシクイ', 1, 1),
('ハイイロガン', 1, 1),
('ホオジロガモ', 1, 1),
('ユキウサギ', 1, 1),
('カササギガン', 1, 1),
('オーストラリアウズラ', 1, 1),
('チベットノウサギ', 1, 1),
('メジロガモ', 1, 1),
('オカヨシガモ', 1, 1),
('アオライチョウ', 1, 1),
('アメリカオシドリ', 1, 1),
('オナガガモ', 1, 1),
('ハクガン', 1, 1),
('ヤマシギ', 1, 1),
('アカライチョウ', 1, 1),
('アメリカミンク', 1, 1),
('テン', 1, 1),
-- Level 2
('アカギツネ', 2, 2),
('コヨーテ', 2, 2),
('シベリアジャコウジカ', 2, 2),
('ヨコスジジャッカル', 2, 2),
('タヌキ', 2, 2),
('ハイイロギツネ', 2, 2),
('メキシカンボブキャット', 2, 2),
('アライグマ', 2, 2),
('ボブキャット', 2, 2),
('インドキョン', 2, 2),
('チベットスナギツネ', 2, 2),
('アメリカビーバー', 2, 2),
('ヨーロッパアナグマ', 2, 2),
-- Level 3
('ノロジカ', 3, 3),
('オオヤマネコ', 3, 3),
('スプリングボック', 3, 3),
('ブラックバック', 3, 3),
('アクシスジカ', 3, 3),
('クビワペッカリー', 3, 3),
('プロングホーン', 3, 3),
('野生ヤギ', 3, 3),
('シャモア', 3, 3),
('ホッグジカ', 3, 3),
-- Level 4
('ダマジカ', 4, 4),
('オジロジカ', 4, 4),
('オグロジカ', 4, 4),
('レッサークーズー', 4, 4),
('イボイノシシ', 4, 4),
('シロイワヤギ', 4, 4),
('ヒマラヤタール', 4, 4),
('ニホンジカ', 4, 4),
('イベリアムフロン', 4, 4),
('グレドスアイベックス', 4, 4),
('サウスイースタンスパニッシュアイベックス', 4, 4),
('ベセイテアイベックス', 4, 4),
('ロンダアイベックス', 4, 4),
('オオカンガルー', 4, 4),
('バーラル', 4, 4),
('ユキヒョウ', 4, 4),
-- Level 5
('イノシシ', 5, 5),
('ピューマ', 5, 5),
('ミュールジカ', 5, 5),
('ロッキーマウンテン・ビッグホーン', 5, 5),
('野生ブタ', 5, 5),
('デザート・ビッグホーン', 5, 5),
('ルサジカ', 5, 5),
-- Level 6
('アカシカ', 6, 6),
('ハイイロオオカミ', 6, 6),
('山のトナカイ', 6, 6),
('オグロヌー', 6, 6),
('オリックス', 6, 6),
('グラントカリブー', 6, 6),
('イベリアオオカミ', 6, 6),
('ニルガイ', 6, 6),
('バラシンガジカ', 6, 6),
('ウッドランドカリブー', 6, 6),
-- Level 7
('アメリカグマ', 7, 7),
('アメリカアカシカ', 7, 7),
('ヒグマ', 7, 7),
('ロッキーマウンテンエルク', 7, 7),
('アメリカアリゲーター', 7, 7),
('サンバー', 7, 7),
('マニトバヘラジカ', 7, 7),
-- Level 8
('ヘラジカ', 8, 8),
('グリズリー', 8, 8),
('イリエワニ', 8, 8),
-- Level 9
('ヨーロッパバイソン', 9, 9),
('ライオン', 9, 9),
('アフリカスイギュウ', 9, 9),
('スイギュウ', 9, 9),
('ヘイゲンバイソン', 9, 9),
('バンテン', 9, 9),
('ベンガルトラ', 9, 9),
('ノヤク', 9, 9),
('アメリカバイソン', 9, 9);

-- =====================================================
-- AREA-ANIMAL RELATIONSHIPS
-- =====================================================

INSERT INTO area_animals (area_id, animal_id)
SELECT ha.id, a.id FROM hunting_areas ha, animals a
WHERE ha.name = 'ヒルシュフェルデン保護区'
AND a.name IN (
  'アナウサギ', 'カナダガン', 'コウライキジ',
  'アカギツネ', 'ノロジカ', 'ダマジカ',
  'イノシシ', 'アカシカ', 'ヨーロッパバイソン'
);

INSERT INTO area_animals (area_id, animal_id)
SELECT ha.id, a.id FROM hunting_areas ha, animals a
WHERE ha.name = 'レイトン湖水地方'
AND a.name IN (
  'オジロジャックウサギ', 'マガモ', 'メリアム・シチメンチョウ',
  'コヨーテ', 'オジロジカ', 'オグロジカ',
  'アメリカグマ', 'アメリカアカシカ', 'ヘラジカ'
);

INSERT INTO area_animals (area_id, animal_id)
SELECT ha.id, a.id FROM hunting_areas ha, animals a
WHERE ha.name = 'メドヴェド＝タイガ国立公園'
AND a.name IN (
  'ヨーロッパオオライチョウ', 'シベリアジャコウジカ', 'オオヤマネコ',
  'イノシシ', 'ハイイロオオカミ', '山のトナカイ',
  'ヒグマ', 'ヘラジカ'
);

INSERT INTO area_animals (area_id, animal_id)
SELECT ha.id, a.id FROM hunting_areas ha, animals a
WHERE ha.name = 'ヴルホンガ・サバンナ'
AND a.name IN (
  'スクラブノウサギ', 'ヒドリガモ', 'ヨコスジジャッカル',
  'スプリングボック', 'レッサークーズー', 'イボイノシシ',
  'オグロヌー', 'オリックス', 'ライオン', 'アフリカスイギュウ'
);

INSERT INTO area_animals (area_id, animal_id)
SELECT ha.id, a.id FROM hunting_areas ha, animals a
WHERE ha.name = 'パルケ・フェルナンド'
AND a.name IN (
  'アカシマアジ', 'ブラックバック', 'アクシスジカ',
  'クビワペッカリー', 'ピューマ', 'ミュールジカ',
  'アカシカ', 'スイギュウ'
);

INSERT INTO area_animals (area_id, animal_id)
SELECT ha.id, a.id FROM hunting_areas ha, animals a
WHERE ha.name = 'ユーコンバレー自然保護区'
AND a.name IN (
  'カナダガン', 'シノリガモ', 'アカギツネ',
  'ハイイロオオカミ', 'グラントカリブー',
  'グリズリー', 'ヘラジカ', 'ヘイゲンバイソン'
);

INSERT INTO area_animals (area_id, animal_id)
SELECT ha.id, a.id FROM hunting_areas ha, animals a
WHERE ha.name = 'クアトロ・コリナス狩猟保護区'
AND a.name IN (
  'コウライキジ', 'ヤブノウサギ', 'ノロジカ',
  'イベリアムフロン', 'グレドスアイベックス',
  'サウスイースタンスパニッシュアイベックス', 'ベセイテアイベックス', 'ロンダアイベックス',
  'イノシシ', 'イベリアオオカミ', 'アカシカ'
);

INSERT INTO area_animals (area_id, animal_id)
SELECT ha.id, a.id FROM hunting_areas ha, animals a
WHERE ha.name = 'シルバーリッジ・ピークス'
AND a.name IN (
  'メリアム・シチメンチョウ', 'プロングホーン', 'シロイワヤギ',
  'ロッキーマウンテン・ビッグホーン', 'ピューマ', 'ミュールジカ',
  'アメリカグマ', 'ロッキーマウンテンエルク', 'ヘイゲンバイソン'
);

INSERT INTO area_animals (area_id, animal_id)
SELECT ha.id, a.id FROM hunting_areas ha, animals a
WHERE ha.name = 'テ・アワロア国立公園'
AND a.name IN (
  'アナウサギ', 'マガモ', 'メリアム・シチメンチョウ',
  '野生ヤギ', 'シャモア', 'ヒマラヤタール',
  'ニホンジカ', 'ダマジカ', '野生ブタ', 'アカシカ'
);

INSERT INTO area_animals (area_id, animal_id)
SELECT ha.id, a.id FROM hunting_areas ha, animals a
WHERE ha.name = '渓谷牧場'
AND a.name IN (
  'コウライキジ', 'リオ・グランデ・シチメンチョウ', 'アンテロープジャックウサギ',
  'コヨーテ', 'メキシカンボブキャット', 'プロングホーン',
  'クビワペッカリー', 'オジロジカ', 'デザート・ビッグホーン', 'ミュールジカ'
);

INSERT INTO area_animals (area_id, animal_id)
SELECT ha.id, a.id FROM hunting_areas ha, animals a
WHERE ha.name = 'ミシシッピ・エーカーズ保護区'
AND a.name IN (
  'イースタン・ワイルド・ターキー', 'アメリカコガモ', 'コリンウズラ',
  'トウブワタオウサギ', 'アライグマ', 'ハイイロギツネ',
  'オジロジカ', 'イノシシ', 'アメリカグマ', 'アメリカアリゲーター'
);

INSERT INTO area_animals (area_id, animal_id)
SELECT ha.id, a.id FROM hunting_areas ha, animals a
WHERE ha.name = 'レボントゥリ海岸'
AND a.name IN (
  'イワライチョウ', 'エゾライチョウ', 'カラフトライチョウ',
  'キンクロハジロ', 'クロライチョウ', 'コガモ',
  'ツンドラヒシクイ', 'ハイイロガン', 'ヒドリガモ',
  'ホオジロガモ', 'ユキウサギ', 'ヨーロッパオオライチョウ',
  'カナダガン', 'マガモ', 'タヌキ',
  'オオヤマネコ', 'オジロジカ', 'ヒグマ', 'ヘラジカ'
);

INSERT INTO area_animals (area_id, animal_id)
SELECT ha.id, a.id FROM hunting_areas ha, animals a
WHERE ha.name = 'ニューイングランド山地'
AND a.name IN (
  'アメリカコガモ', 'イースタン・ワイルド・ターキー', 'コウライキジ',
  'コリンウズラ', 'トウブワタオウサギ', 'ホオジロガモ',
  'マガモ', 'アカギツネ', 'アライグマ',
  'コヨーテ', 'ハイイロギツネ', 'ボブキャット',
  'オジロジカ', 'アメリカグマ', 'ヘラジカ'
);

INSERT INTO area_animals (area_id, animal_id)
SELECT ha.id, a.id FROM hunting_areas ha, animals a
WHERE ha.name = 'エメラルド海岸'
AND a.name IN (
  'カササギガン', 'オーストラリアウズラ', 'アカギツネ',
  '野生ヤギ', 'アクシスジカ', 'ホッグジカ',
  'オオカンガルー', 'ダマジカ', '野生ブタ',
  'ルサジカ', 'アカシカ', 'サンバー',
  'イリエワニ', 'バンテン'
);

INSERT INTO area_animals (area_id, animal_id)
SELECT ha.id, a.id FROM hunting_areas ha, animals a
WHERE ha.name = 'スンダルパタン保護区'
AND a.name IN (
  'ハイイロガン', 'チベットノウサギ', 'インドキョン',
  'チベットスナギツネ', 'ブラックバック', 'バーラル',
  'ヒマラヤタール', 'ユキヒョウ', 'ニルガイ',
  'バラシンガジカ', 'スイギュウ', 'ベンガルトラ', 'ノヤク'
);

INSERT INTO area_animals (area_id, animal_id)
SELECT ha.id, a.id FROM hunting_areas ha, animals a
WHERE ha.name = 'ザルツヴィーゼン公園'
AND a.name IN (
  'コガモ', 'ヒドリガモ', 'ツンドラヒシクイ',
  'メジロガモ', 'オカヨシガモ', 'キンクロハジロ',
  'ホオジロガモ', 'マガモ', 'ハイイロガン',
  'クロライチョウ', 'コウライキジ', 'アナウサギ',
  'アカギツネ', 'アライグマ', 'タヌキ'
);

INSERT INTO area_animals (area_id, animal_id)
SELECT ha.id, a.id FROM hunting_areas ha, animals a
WHERE ha.name = 'アスキー・リッジ狩猟保護区'
AND a.name IN (
  'アオライチョウ', 'アメリカオシドリ', 'オナガガモ',
  'カナダガン', 'コウライキジ', 'ハクガン',
  'マガモ', 'アメリカビーバー', 'プロングホーン',
  'オジロジカ', 'シロイワヤギ', 'ロッキーマウンテン・ビッグホーン',
  'ミュールジカ', 'ハイイロオオカミ', 'ウッドランドカリブー',
  'アメリカグマ', 'マニトバヘラジカ', 'ヘラジカ', 'アメリカバイソン'
);

INSERT INTO area_animals (area_id, animal_id)
SELECT ha.id, a.id FROM hunting_areas ha, animals a
WHERE ha.name = 'トール・ナン・シアン狩猟場'
AND a.name IN (
  'コウライキジ', 'ヤマシギ', 'ヒドリガモ',
  'アカライチョウ', 'クロライチョウ', 'ヨーロッパオオライチョウ',
  'ユキウサギ', 'アメリカミンク', 'テン',
  'ヨーロッパアナグマ', 'アカギツネ', '野生ヤギ',
  'ノロジカ', 'ダマジカ', 'ニホンジカ',
  'イノシシ', 'アカシカ'
);

-- =====================================================
-- SCOPES
-- =====================================================

INSERT INTO scopes (name, magnification, weight, required_score, price, description) VALUES
-- Rifle scopes
('アセント1-4X24ライフルスコープ',                         '1-4',  0.50, 0,    0,     '初期支給されている、最大4倍の可変倍率スコープ。'),
('トゥルービジョン・トリチウムサイト(モデルR243)',          '1',    0.00, 100,  3000,  'サイト先端が常に緑色に発光しており、夜間や暗い場所での視認性が向上する。'),
('トゥルービジョン・トリチウムサイト(モデルR223)',          '1',    0.00, 250,  3000,  'サイト先端が常に緑色に発光しており、夜間や暗い場所での視認性が向上する。'),
('トゥルービジョン・トリチウムサイト(モデルAR45)',          '1',    0.00, 0,    3000,  'サイト先端が常に緑色に発光しており、夜間や暗い場所での視認性が向上する。'),
('トゥルービジョン・トリチウムサイト(モデルR270)',          '1',    0.00, 1150, 3000,  'サイト先端が常に緑色に発光しており、夜間や暗い場所での視認性が向上する。'),
('トゥルービジョン・トリチウムサイト(モデルR4570)',         '1',    0.00, 3100, 3000,  'サイト先端が常に緑色に発光しており、夜間や暗い場所での視認性が向上する。'),
('トゥルービジョン・トリチウムサイト(モデルR65)',           '1',    0.50, 700,  3000,  'サイト先端が常に緑色に発光しており、夜間や暗い場所での視認性が向上する。'),
('トゥルービジョン・トリチウムサイト(モデルR7)',            '1',    0.00, 1900, 3000,  'サイト先端が常に緑色に発光しており、夜間や暗い場所での視認性が向上する。'),
('トゥルービジョン・トリチウムサイト(モデルR3006)',         '1',    0.00, 0,    3000,  'サイト先端が常に緑色に発光しており、夜間や暗い場所での視認性が向上する。'),
('トゥルービジョン・トリチウムサイト(モデルR338)',          '1',    0.00, 0,    3000,  'サイト先端が常に緑色に発光しており、夜間や暗い場所での視認性が向上する。'),
('トゥルービジョン・トリチウムサイト(モデル7mm)',           '1',    0.00, 0,    3000,  'サイト先端が常に緑色に発光しており、夜間や暗い場所での視認性が向上する。'),
('トゥルービジョン・トリチウムサイト(モデルLRR338)',        '1',    0.00, 0,    3000,  'サイト先端が常に緑色に発光しており、夜間や暗い場所での視認性が向上する。'),
('トゥルービジョン・トリチウムサイト(モデルR250)',          '1',    0.00, 0,    3000,  'サイト先端が常に緑色に発光しており、夜間や暗い場所での視認性が向上する。'),
('トゥルービジョン・トリチウムサイト(モデルR308)',          '1',    0.00, 0,    3000,  'サイト先端が常に緑色に発光しており、夜間や暗い場所での視認性が向上する。'),
('ハイペリオン4-8X42ライフルスコープ',                     '4-8',  0.50, 550,  12000, '4-8倍に対応する、アセントよりも高倍率の可変倍率スコープ。'),
('レッドラプター・リフレックスサイト',                     '1',    0.50, 250,  6000,  '無倍率のレッドドットサイト。'),
('ヘリオス4-8X32ライフルスコープ',                         '4-8',  0.50, 2500, 24000, 'レバーアクション式ライフル専用の、4-8倍に対応する可変倍率スコープ。'),
('アーガス8-16X50ライフルスコープ',                        '8-16', 0.50, 3900, 36000, '最低8倍、最高16倍の最高倍率を持つ高性能可変倍率スコープ。'),
('マークスマンエグザクト・リフレックスサイト',             '1',    0.50, 6200, 8500,  '無倍率の光学式レッドドットサイト。'),
('ジェンゼロ1-4x20ライフル用暗視スコープ',                 '1-4',  0.50, 0,    0,     '暗視機能を備えた1-4倍の可変倍率スコープ。'),
('ガリレオ4-8x32マズルローダースコープ',                   '4-8',  0.50, 0,    0,     'マスケット銃のHUDZIK.50 CAPLOCK専用のスコープ。'),
('オーディン4-12X33ライフルスコープ',                      '4-12', 0.50, 0,    0,     '単純により高倍率になったライフルスコープ。200m以上の狙撃も目に見えて楽になる。'),
('アングラー4-8X100ライフル用暗視スコープ',                '4-8',  0.50, 0,    0,     'ジェンゼロよりも更に高倍率になったライフル用暗視スコープ。'),
-- Handgun scopes
('ゴスホーク・レッドアイ2-4X20ハンドガンスコープ',         '2-4',  0.50, 1700, 12000, 'ハンドガンでも遠方の精密な射撃が可能になる。'),
('トゥルービジョン・トリチウムサイト(モデルH357)',          '1',    0.00, 100,  3000,  'サイト先端が常に緑色に発光しており、夜間や暗い場所での視認性が向上する。'),
('トゥルービジョン・トリチウムサイト(モデルH44)',           '1',    0.00, 1150, 3000,  'サイト先端が常に緑色に発光しており、夜間や暗い場所での視認性が向上する。'),
('トゥルービジョン・トリチウムサイト(モデルH454)',          '1',    0.00, 3900, 3000,  'サイト先端が常に緑色に発光しており、夜間や暗い場所での視認性が向上する。'),
('トゥルービジョン・トリチウムサイト(モデルH22)',           '1',    0.00, 0,    3000,  'サイト先端が常に緑色に発光しており、夜間や暗い場所での視認性が向上する。'),
('マークスマンダヴァニ・リフレックスサイト',               '1',    0.50, 0,    0,     '10mmダヴァニ専用の無倍率の光学式レッドドットサイト。'),
('ヘルメース3-7X33ハンドガン&ショットガンスコープ',         '3-7',  0.50, 0,    0,     'ハンドガンとショットガンの双方に対応している。このため双方を持ち込みたい狩りにおいてはスコープ1つ分重量が浮くことになる。'),
-- Shotgun scopes
('メリディアン1-4x20ショットガンスコープ',                 '1-4',  0.50, 5300, 12000, 'ショットガン用の可変倍率スコープ。'),
('トゥルービジョン・トリチウムサイト(モデルSOU12)',         '1',    0.50, 550,  3000,  'サイト先端が常に緑色に発光しており、夜間や暗い場所での視認性が向上する。'),
('トゥルービジョン・トリチウムサイト(モデルSPA12)',         '1',    0.50, 1900, 3000,  'サイト先端が常に緑色に発光しており、夜間や暗い場所での視認性が向上する。'),
('ファルコン3-9x44ドリリングスコープ',                     '3-9',  0.50, 0,    0,     'グリェルク・ドリリングライフル専用の高倍率スコープ。'),
-- Bow sights
('ブライトサイト・シングルピンサイト',                     '1',    0.00, 250,  3000,  'サイト先端が常に緑色に発光しており、夜間や暗い場所での視認性が向上する。'),
('スイフトマーク3ボウサイト',                              '1',    0.00, 2200, 12000, '3つのピンをもつコンパウンドボウ専用サイト。'),
('スイフトマーク5ボウサイト',                              '1',    0.00, 5300, 24000, '5つのピンをもつコンパウンドボウ専用サイト。'),
('ブライトサイト測距儀付きボウサイト',                     '1',    2.00, 0,    0,     '赤いドットの入った測距儀（距離測定機）付きのハイテクサイト。'),
('ホークン1-5x30クロスボウスコープ',                       '1-5',  0.50, 0,    0,     'クロスボウで300フィート/秒以上に速い射撃を実現するために設計された特注スコープ。');
