CREATE TABLE IF NOT EXISTS organizer_policies (
 event_id text PRIMARY KEY REFERENCES events(id), tenant_id text NOT NULL REFERENCES tenants(id),
 allowed_templates jsonb NOT NULL, max_price_wei numeric(78,0) NOT NULL CHECK(max_price_wei > 0),
 enabled boolean NOT NULL DEFAULT true, updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS organizer_imports (
 id text PRIMARY KEY, tenant_id text NOT NULL REFERENCES tenants(id), event_id text NOT NULL REFERENCES events(id),
 principal_id text NOT NULL REFERENCES principals(id), snapshot_id text REFERENCES snapshots(id),
 table_names jsonb NOT NULL, diagnostics jsonb NOT NULL, created_at timestamptz NOT NULL DEFAULT now()
);
