-- Enable public read access for animal detail tables

ALTER TABLE animal_need_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE animal_furs       ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read animal_need_zones" ON animal_need_zones;
DROP POLICY IF EXISTS "public read animal_furs"       ON animal_furs;

CREATE POLICY "public read animal_need_zones" ON animal_need_zones FOR SELECT USING (true);
CREATE POLICY "public read animal_furs"       ON animal_furs       FOR SELECT USING (true);

-- Reload PostgREST schema cache to register new tables and columns
NOTIFY pgrst, 'reload schema';
