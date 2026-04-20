-- Restore RLS policies lost when migration 005 dropped and recreated these tables

ALTER TABLE firearms      ENABLE ROW LEVEL SECURITY;
ALTER TABLE firearm_ammo  ENABLE ROW LEVEL SECURITY;
ALTER TABLE scope_firearms ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read firearms"      ON firearms;
DROP POLICY IF EXISTS "public read firearm_ammo"  ON firearm_ammo;
DROP POLICY IF EXISTS "public read scope_firearms" ON scope_firearms;

CREATE POLICY "public read firearms"      ON firearms      FOR SELECT USING (true);
CREATE POLICY "public read firearm_ammo"  ON firearm_ammo  FOR SELECT USING (true);
CREATE POLICY "public read scope_firearms" ON scope_firearms FOR SELECT USING (true);
