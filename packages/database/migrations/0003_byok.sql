-- Per-mission provider credentials (bring-your-own-key). Ciphertext only; never logged or returned.
ALTER TABLE missions ADD COLUMN IF NOT EXISTS provider_credentials text;
