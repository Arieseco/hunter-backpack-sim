ALTER TABLE firearms
  ADD COLUMN IF NOT EXISTS bow_type TEXT
    CHECK (bow_type IN ('コンパウンドボウ', 'クロスボウ', 'リカーブボウ'));

UPDATE firearms SET bow_type = 'コンパウンドボウ' WHERE name = 'ベアクロー・ライトCB-60';
UPDATE firearms SET bow_type = 'コンパウンドボウ' WHERE name = 'レイザーバック・ライトCB-60';
UPDATE firearms SET bow_type = 'コンパウンドボウ' WHERE name = 'ホークエッジCB-70';
UPDATE firearms SET bow_type = 'コンパウンドボウ' WHERE name = 'コーターCB-65';
UPDATE firearms SET bow_type = 'クロスボウ'       WHERE name = 'クロスポイントCB-165';
UPDATE firearms SET bow_type = 'リカーブボウ'     WHERE name = 'アレクサンダー・ロングボウ';
UPDATE firearms SET bow_type = 'リカーブボウ'     WHERE name = 'ホウイー・リカーブ・ボウ';
UPDATE firearms SET bow_type = 'リカーブボウ'     WHERE name = 'ステンバーグ・テイクダウン・リカーブ・ボウ';

NOTIFY pgrst, 'reload schema';
