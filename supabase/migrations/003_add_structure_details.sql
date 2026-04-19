-- Migration 003: Add structure-specific columns to items table
-- Run this in Supabase Studio > SQL Editor

ALTER TABLE items
  ADD COLUMN IF NOT EXISTS reduces_hunting_pressure BOOLEAN,
  ADD COLUMN IF NOT EXISTS concealment_rate INTEGER,
  ADD COLUMN IF NOT EXISTS max_installations INTEGER,
  ADD COLUMN IF NOT EXISTS disturbance_radius INTEGER;
