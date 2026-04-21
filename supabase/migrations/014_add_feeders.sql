-- Extend category check constraint to include feeder
ALTER TABLE items DROP CONSTRAINT items_category_check;

ALTER TABLE items ADD CONSTRAINT items_category_check
  CHECK (category IN ('call', 'scent', 'equipment', 'structure', 'backpack', 'feeder'));

-- Add feeder items
INSERT INTO items (id, name, category, weight, weight_bonus, description, price) VALUES
  (gen_random_uuid(), 'ボックス型給餌装置',     'feeder', 6,  0, 'シカ、レイヨウ',                               12000),
  (gen_random_uuid(), '吊り下げ式給餌装置',     'feeder', 6,  0, 'ヒツジ、ヤギ、バイソン、スイギュウ、シカ、レイヨウ', 10000),
  (gen_random_uuid(), 'ミネラルリック給餌装置', 'feeder', 8,  0, 'シカ、レイヨウ、ブタ、ウサギ、ノウサギ',          12000),
  (gen_random_uuid(), '獲物吊り下げ型給餌装置', 'feeder', 6,  0, '捕食者、爬虫類',                               12000),
  (gen_random_uuid(), '餌箱',                  'feeder', 10, 0, 'クマ、ブタ',                                   10000),
  (gen_random_uuid(), '香り付き管状給餌装置',   'feeder', 6,  0, 'イヌ科、肉食、腐食',                            12000);
