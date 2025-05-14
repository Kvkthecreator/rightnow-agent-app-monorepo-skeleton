-- 📄 Migration: Add sns_url to profiles
-- Description: Adds a new column for the full social media URL

ALTER TABLE profiles
ADD COLUMN sns_url TEXT;