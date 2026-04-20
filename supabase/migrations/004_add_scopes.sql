-- Scopes table
CREATE TABLE IF NOT EXISTS scopes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  magnification TEXT NOT NULL,
  weight DECIMAL(5,2) NOT NULL,
  required_score INTEGER,
  price INTEGER,
  description TEXT
);

-- Scope-Firearm relationship (many-to-many)
CREATE TABLE IF NOT EXISTS scope_firearms (
  scope_id UUID REFERENCES scopes(id) ON DELETE CASCADE,
  firearm_id UUID REFERENCES firearms(id) ON DELETE CASCADE,
  PRIMARY KEY (scope_id, firearm_id)
);
