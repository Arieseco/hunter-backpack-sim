-- Migration 002: Add item_type column to items table
-- Used by equipment items to distinguish subcategories (e.g. 双眼鏡, その他)
-- Run this in Supabase Studio > SQL Editor

ALTER TABLE items
  ADD COLUMN IF NOT EXISTS item_type TEXT;
