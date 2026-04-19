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
INSERT INTO items (name, category, weight, weight_bonus, description) VALUES
('ニオイ消しスプレー', 'scent', 0.30, 0, 'プレイヤーの臭いを軽減し、動物に気づかれにくくする。'),
('アトラクタント（鹿）', 'scent', 0.30, 0, '鹿を引き付ける誘引剤。地面に撒いて使用。'),
('アトラクタント（エルク）', 'scent', 0.30, 0, 'エルクを引き付ける誘引剤。'),
('アトラクタント（クマ）', 'scent', 0.30, 0, 'クマを引き付ける誘引剤。'),
('ニオイ消しパウダー', 'scent', 0.20, 0, '体から出る臭いをより長時間中和するパウダー。');

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
('ウサギ（Rabbit）', 1, 1),
('キツネ（Fox）', 1, 2),
('コヨーテ（Coyote）', 2, 3),
('アライグマ（Raccoon）', 1, 2),
('七面鳥（Wild Turkey）', 1, 2),
('カモ（Mallard Duck）', 1, 2),
('カナダガン（Canada Goose）', 1, 2),
('ブラックテール鹿（Blacktail Deer）', 3, 4),
('ホワイトテール鹿（Whitetail Deer）', 3, 4),
('ムース（Moose）', 7, 8),
('エルク（Roosevelt Elk）', 5, 6),
('ブラックベア（Black Bear）', 6, 8),
('グリズリーベア（Grizzly Bear）', 7, 9),
('バイソン（Bison）', 8, 9),
('マウンテンライオン（Mountain Lion）', 5, 6),
('プロングホーン（Pronghorn）', 3, 5),
('マウンテンゴート（Mountain Goat）', 4, 5),
('ビッグホーンシープ（Bighorn Sheep）', 5, 6),
('ワピチ（Elk）', 6, 7),
('ヘラジカ（Eurasian Elk）', 7, 8),
('アカシカ（Red Deer）', 5, 6),
('ノロジカ（Roe Deer）', 2, 4),
('イノシシ（Wild Boar）', 4, 6),
('ウシシカ（Fallow Deer）', 4, 5),
('ダマジカ（Fallow Deer）', 4, 5),
('ライオン（Lion）', 8, 9),
('ヒョウ（Leopard）', 7, 8),
('カフィルバッファロー（Cape Buffalo）', 8, 9),
('インパラ（Impala）', 2, 4),
('ヌー（Blue Wildebeest）', 6, 7),
('スプリングボック（Springbok）', 3, 4),
('シマウマ（Zebra）', 5, 6),
('クーズー（Greater Kudu）', 6, 7),
('スプリングボック（Springbok）', 2, 3),
('オジロジカ（Whitetail Deer）', 3, 4),
('ウォーターバック（Waterbuck）', 5, 6);

-- =====================================================
-- AREA-ANIMAL RELATIONSHIPS
-- =====================================================

-- レイトン湖水地方 (North American species)
INSERT INTO area_animals (area_id, animal_id)
SELECT ha.id, a.id FROM hunting_areas ha, animals a
WHERE ha.name = 'レイトン湖水地方'
AND a.name IN (
  'ウサギ（Rabbit）', 'コヨーテ（Coyote）', '七面鳥（Wild Turkey）',
  'カモ（Mallard Duck）', 'カナダガン（Canada Goose）',
  'ブラックテール鹿（Blacktail Deer）', 'ホワイトテール鹿（Whitetail Deer）',
  'ムース（Moose）', 'エルク（Roosevelt Elk）', 'ブラックベア（Black Bear）',
  'グリズリーベア（Grizzly Bear）'
);

-- メドヴェド＝タイガ国立公園 (Russian/Siberian species)
INSERT INTO area_animals (area_id, animal_id)
SELECT ha.id, a.id FROM hunting_areas ha, animals a
WHERE ha.name = 'メドヴェド＝タイガ国立公園'
AND a.name IN (
  'ウサギ（Rabbit）', 'キツネ（Fox）', 'アライグマ（Raccoon）',
  'ヘラジカ（Eurasian Elk）', 'ブラックベア（Black Bear）',
  'グリズリーベア（Grizzly Bear）', 'ワピチ（Elk）'
);

-- ヒルシュフェルデン保護区 (European species)
INSERT INTO area_animals (area_id, animal_id)
SELECT ha.id, a.id FROM hunting_areas ha, animals a
WHERE ha.name = 'ヒルシュフェルデン保護区'
AND a.name IN (
  'ウサギ（Rabbit）', 'キツネ（Fox）', 'カモ（Mallard Duck）',
  'アカシカ（Red Deer）', 'ノロジカ（Roe Deer）', 'イノシシ（Wild Boar）',
  'ウシシカ（Fallow Deer）'
);

-- ヴルホンガ・サバンナ (African species)
INSERT INTO area_animals (area_id, animal_id)
SELECT ha.id, a.id FROM hunting_areas ha, animals a
WHERE ha.name = 'ヴルホンガ・サバンナ'
AND a.name IN (
  'ライオン（Lion）', 'ヒョウ（Leopard）', 'カフィルバッファロー（Cape Buffalo）',
  'インパラ（Impala）', 'ヌー（Blue Wildebeest）', 'スプリングボック（Springbok）',
  'シマウマ（Zebra）', 'クーズー（Greater Kudu）', 'ウォーターバック（Waterbuck）'
);

-- シルバーリッジ・ピークス (High altitude North American)
INSERT INTO area_animals (area_id, animal_id)
SELECT ha.id, a.id FROM hunting_areas ha, animals a
WHERE ha.name = 'シルバーリッジ・ピークス'
AND a.name IN (
  'コヨーテ（Coyote）', 'プロングホーン（Pronghorn）',
  'マウンテンゴート（Mountain Goat）', 'ビッグホーンシープ（Bighorn Sheep）',
  'エルク（Roosevelt Elk）', 'ムース（Moose）', 'マウンテンライオン（Mountain Lion）',
  'グリズリーベア（Grizzly Bear）'
);
