-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Firearms table
CREATE TABLE IF NOT EXISTS firearms (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name              TEXT NOT NULL,
  type              TEXT NOT NULL CHECK (type IN ('rifle', 'shotgun', 'handgun', 'bow', 'muzzleloader')),
  accuracy          INTEGER,
  recoil            INTEGER,
  reload_speed      INTEGER,
  hipfire_accuracy  INTEGER,
  magazine_capacity INTEGER,
  weight            DECIMAL(5,2) NOT NULL,
  required_score    INTEGER DEFAULT 0,
  price             INTEGER DEFAULT 0,
  comment           TEXT,
  image_url         TEXT
);

-- Ammo table
CREATE TABLE IF NOT EXISTS ammo (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  weight DECIMAL(5,2) NOT NULL,
  class_min INTEGER,
  class_max INTEGER,
  description TEXT
);

-- Firearm-Ammo relationship
CREATE TABLE IF NOT EXISTS firearm_ammo (
  firearm_id UUID REFERENCES firearms(id) ON DELETE CASCADE,
  ammo_id UUID REFERENCES ammo(id) ON DELETE CASCADE,
  PRIMARY KEY (firearm_id, ammo_id)
);

-- Items table (non-firearms)
CREATE TABLE IF NOT EXISTS items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('call', 'scent', 'equipment', 'structure', 'backpack')),
  weight DECIMAL(5,2) NOT NULL,
  weight_bonus DECIMAL(5,2) DEFAULT 0,
  description TEXT,
  image_url TEXT
);

-- Hunting areas
CREATE TABLE IF NOT EXISTS hunting_areas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT
);

-- Animals
CREATE TABLE IF NOT EXISTS animals (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT NOT NULL,
  level_min     INTEGER NOT NULL,
  level_max     INTEGER NOT NULL,
  image_url     TEXT,
  difficulty_min INTEGER,
  difficulty_max INTEGER,
  trophy_type   TEXT,
  silver_score  NUMERIC,
  gold_score    NUMERIC,
  diamond_score NUMERIC,
  has_great_one BOOLEAN NOT NULL DEFAULT FALSE,
  weight_min    NUMERIC,
  weight_max    NUMERIC,
  features      TEXT
);

-- Animal need zones
CREATE TABLE IF NOT EXISTS animal_need_zones (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  animal_id   UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
  area_id     UUID NOT NULL REFERENCES hunting_areas(id) ON DELETE CASCADE,
  time_start  TEXT NOT NULL,
  time_end    TEXT NOT NULL,
  behavior    TEXT NOT NULL CHECK (behavior IN ('feeding', 'resting', 'drinking'))
);

-- Animal fur types
CREATE TABLE IF NOT EXISTS animal_furs (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  animal_id   UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
  fur_name    TEXT NOT NULL,
  probability NUMERIC NOT NULL,
  rarity      TEXT NOT NULL CHECK (rarity IN ('common', 'uncommon', 'rare', 'very_rare')),
  gender      TEXT CHECK (gender IN ('male', 'female'))
);

-- Area-Animal relationship
CREATE TABLE IF NOT EXISTS area_animals (
  area_id UUID REFERENCES hunting_areas(id) ON DELETE CASCADE,
  animal_id UUID REFERENCES animals(id) ON DELETE CASCADE,
  PRIMARY KEY (area_id, animal_id)
);

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

-- Saved simulations
CREATE TABLE IF NOT EXISTS simulations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT,
  pack_mule BOOLEAN DEFAULT FALSE,
  backpack_item_id UUID REFERENCES items(id),
  selected_items JSONB NOT NULL DEFAULT '[]',
  total_weight DECIMAL(5,2) NOT NULL,
  capacity DECIMAL(5,2) NOT NULL
);
