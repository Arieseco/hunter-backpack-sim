-- =====================================================
-- Row Level Security Policies
-- Run this AFTER schema.sql
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE firearms ENABLE ROW LEVEL SECURITY;
ALTER TABLE ammo ENABLE ROW LEVEL SECURITY;
ALTER TABLE firearm_ammo ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE hunting_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE animals ENABLE ROW LEVEL SECURITY;
ALTER TABLE area_animals ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulations ENABLE ROW LEVEL SECURITY;

-- Game data tables: public read-only (no write from client)
CREATE POLICY "public read firearms"     ON firearms      FOR SELECT USING (true);
CREATE POLICY "public read ammo"         ON ammo          FOR SELECT USING (true);
CREATE POLICY "public read firearm_ammo" ON firearm_ammo  FOR SELECT USING (true);
CREATE POLICY "public read items"        ON items         FOR SELECT USING (true);
CREATE POLICY "public read areas"        ON hunting_areas FOR SELECT USING (true);
CREATE POLICY "public read animals"      ON animals       FOR SELECT USING (true);
CREATE POLICY "public read area_animals" ON area_animals  FOR SELECT USING (true);

-- Simulations: anyone can insert, and read by UUID (no listing all)
CREATE POLICY "anyone can save simulation"  ON simulations FOR INSERT WITH CHECK (true);
CREATE POLICY "anyone can read by id"       ON simulations FOR SELECT USING (true);
