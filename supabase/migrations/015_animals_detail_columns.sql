-- Add detail columns to animals table
ALTER TABLE animals ADD COLUMN IF NOT EXISTS image_url       TEXT;
ALTER TABLE animals ADD COLUMN IF NOT EXISTS difficulty_min  INTEGER;
ALTER TABLE animals ADD COLUMN IF NOT EXISTS difficulty_max  INTEGER;
ALTER TABLE animals ADD COLUMN IF NOT EXISTS trophy_type     TEXT;
ALTER TABLE animals ADD COLUMN IF NOT EXISTS silver_score    NUMERIC;
ALTER TABLE animals ADD COLUMN IF NOT EXISTS gold_score      NUMERIC;
ALTER TABLE animals ADD COLUMN IF NOT EXISTS diamond_score   NUMERIC;
ALTER TABLE animals ADD COLUMN IF NOT EXISTS has_great_one   BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE animals ADD COLUMN IF NOT EXISTS weight_min      NUMERIC;
ALTER TABLE animals ADD COLUMN IF NOT EXISTS weight_max      NUMERIC;
ALTER TABLE animals ADD COLUMN IF NOT EXISTS features        TEXT;

-- Need zones (per area)
CREATE TABLE IF NOT EXISTS animal_need_zones (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  animal_id   UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
  area_id     UUID NOT NULL REFERENCES hunting_areas(id) ON DELETE CASCADE,
  time_start  TEXT NOT NULL,
  time_end    TEXT NOT NULL,
  behavior    TEXT NOT NULL CHECK (behavior IN ('feeding', 'resting', 'drinking'))
);

-- Fur types
CREATE TABLE IF NOT EXISTS animal_furs (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  animal_id   UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
  fur_name    TEXT NOT NULL,
  probability NUMERIC NOT NULL,
  rarity      TEXT NOT NULL CHECK (rarity IN ('common', 'uncommon', 'rare', 'very_rare')),
  gender      TEXT CHECK (gender IN ('male', 'female'))
);
