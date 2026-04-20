-- Add public read policy for scopes (was missing from rls.sql)

ALTER TABLE scopes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read scopes" ON scopes;
CREATE POLICY "public read scopes" ON scopes FOR SELECT USING (true);
