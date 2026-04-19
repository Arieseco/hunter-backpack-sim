-- Migration 001: Add call-specific columns to items table
-- Run this in Supabase Studio > SQL Editor

ALTER TABLE items
  ADD COLUMN IF NOT EXISTS target_animals TEXT,
  ADD COLUMN IF NOT EXISTS effective_distance INTEGER,
  ADD COLUMN IF NOT EXISTS attraction INTEGER,
  ADD COLUMN IF NOT EXISTS effective_duration INTEGER,
  ADD COLUMN IF NOT EXISTS price INTEGER,
  ADD COLUMN IF NOT EXISTS unlock_level INTEGER;
