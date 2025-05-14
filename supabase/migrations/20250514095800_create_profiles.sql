-- V001__create_profiles.sql

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id),
    display_name TEXT,
    brand_name TEXT,
    bio TEXT,
    profile_image_url TEXT,
    industry TEXT,
    goals TEXT[],
    audience TEXT[],
    report_markdown TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_profiles_user_id ON profiles(user_id);
