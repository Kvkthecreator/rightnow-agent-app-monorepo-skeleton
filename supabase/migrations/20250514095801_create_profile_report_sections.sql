-- V002__create_profile_report_sections.sql

CREATE TABLE IF NOT EXISTS profile_report_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    order_index INT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_sections_profile_id ON profile_report_sections(profile_id);
