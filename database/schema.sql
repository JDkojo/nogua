-- ============================================================
-- Real Estate Management System — PostgreSQL Schema
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── USERS & AUTH ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  uuid          UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  first_name    VARCHAR(100) NOT NULL,
  last_name     VARCHAR(100) NOT NULL,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role          VARCHAR(50) NOT NULL DEFAULT 'viewer'
                  CHECK (role IN ('super_admin','admin','manager','agent','viewer')),
  phone         VARCHAR(30),
  avatar_url    TEXT,
  is_active     BOOLEAN DEFAULT TRUE,
  last_login_at TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─── PROPERTIES ──────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS properties (
  id              SERIAL PRIMARY KEY,
  uuid            UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  title           VARCHAR(255) NOT NULL,
  description     TEXT,
  type            VARCHAR(50) NOT NULL
                    CHECK (type IN ('residential','commercial','luxury','land','new_launch')),
  status          VARCHAR(50) NOT NULL DEFAULT 'available'
                    CHECK (status IN ('available','reserved','sold','off_market')),
  price           NUMERIC(15,2) NOT NULL,
  address         TEXT NOT NULL,
  city            VARCHAR(100),
  state           VARCHAR(100),
  country         VARCHAR(100) DEFAULT 'Nigeria',
  latitude        DECIMAL(10,8),
  longitude       DECIMAL(11,8),
  bedrooms        INTEGER,
  bathrooms       INTEGER,
  area_sqm        NUMERIC(10,2),
  features        JSONB DEFAULT '[]',
  media           JSONB DEFAULT '[]',   -- [{url, publicId, type}]
  assigned_agent  INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_by      INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── LAND RECORDS ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS land_records (
  id              SERIAL PRIMARY KEY,
  property_id     INTEGER REFERENCES properties(id) ON DELETE CASCADE,
  owner_name      VARCHAR(255) NOT NULL,
  title_number    VARCHAR(100) UNIQUE,
  title_type      VARCHAR(100),   -- e.g. "C of O", "Deed of Assignment"
  acquisition_date DATE,
  transfer_history JSONB DEFAULT '[]',
  legal_status    VARCHAR(50) DEFAULT 'valid'
                    CHECK (legal_status IN ('valid','disputed','pending','invalid')),
  documents       JSONB DEFAULT '[]',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── LEADS (CRM) ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS leads (
  id              SERIAL PRIMARY KEY,
  uuid            UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  first_name      VARCHAR(100) NOT NULL,
  last_name       VARCHAR(100) NOT NULL,
  email           VARCHAR(255),
  phone           VARCHAR(30),
  interest        VARCHAR(100),   -- buying, selling, investment, etc.
  inquiry_type    VARCHAR(100),
  message         TEXT,
  source          VARCHAR(100) DEFAULT 'website',
  status          VARCHAR(50) DEFAULT 'new'
                    CHECK (status IN ('new','contacted','qualified','converted','lost')),
  assigned_to     INTEGER REFERENCES users(id) ON DELETE SET NULL,
  property_id     INTEGER REFERENCES properties(id) ON DELETE SET NULL,
  follow_up_date  DATE,
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── SALES PIPELINE ──────────────────────────────────────────

CREATE TABLE IF NOT EXISTS sales (
  id              SERIAL PRIMARY KEY,
  uuid            UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  lead_id         INTEGER REFERENCES leads(id) ON DELETE SET NULL,
  property_id     INTEGER REFERENCES properties(id) ON DELETE RESTRICT,
  agent_id        INTEGER REFERENCES users(id) ON DELETE SET NULL,
  stage           VARCHAR(50) NOT NULL DEFAULT 'prospect'
                    CHECK (stage IN ('prospect','negotiation','agreement','payment','completed','cancelled')),
  sale_price      NUMERIC(15,2),
  commission_rate NUMERIC(5,2) DEFAULT 5.00,
  commission_amt  NUMERIC(15,2),
  expected_close  DATE,
  closed_at       TIMESTAMPTZ,
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── PAYMENTS ────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS payments (
  id              SERIAL PRIMARY KEY,
  uuid            UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  sale_id         INTEGER REFERENCES sales(id) ON DELETE SET NULL,
  lead_id         INTEGER REFERENCES leads(id) ON DELETE SET NULL,
  property_id     INTEGER REFERENCES properties(id) ON DELETE SET NULL,
  payer_name      VARCHAR(255) NOT NULL,
  payer_email     VARCHAR(255),
  amount          NUMERIC(15,2) NOT NULL,
  currency        VARCHAR(10) DEFAULT 'NGN',
  payment_type    VARCHAR(50) DEFAULT 'installment'
                    CHECK (payment_type IN ('full','installment','deposit','commission')),
  payment_method  VARCHAR(50),   -- bank_transfer, card, cash, etc.
  reference       VARCHAR(100) UNIQUE,
  status          VARCHAR(50) DEFAULT 'pending'
                    CHECK (status IN ('pending','confirmed','failed','refunded')),
  payment_date    DATE,
  due_date        DATE,
  receipt_url     TEXT,
  notes           TEXT,
  created_by      INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── SITE VISITS / INSPECTIONS ───────────────────────────────

CREATE TABLE IF NOT EXISTS site_visits (
  id              SERIAL PRIMARY KEY,
  uuid            UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  property_id     INTEGER REFERENCES properties(id) ON DELETE CASCADE,
  lead_id         INTEGER REFERENCES leads(id) ON DELETE SET NULL,
  agent_id        INTEGER REFERENCES users(id) ON DELETE SET NULL,
  client_name     VARCHAR(255) NOT NULL,
  client_email    VARCHAR(255),
  client_phone    VARCHAR(30),
  visit_date      DATE NOT NULL,
  visit_time      TIME,
  status          VARCHAR(50) DEFAULT 'scheduled'
                    CHECK (status IN ('scheduled','confirmed','completed','cancelled','no_show')),
  outcome         TEXT,
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── DOCUMENTS ───────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS documents (
  id              SERIAL PRIMARY KEY,
  uuid            UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  title           VARCHAR(255) NOT NULL,
  type            VARCHAR(100),   -- contract, deed, receipt, id, etc.
  file_url        TEXT NOT NULL,
  public_id       TEXT,           -- Cloudinary public ID
  version         INTEGER DEFAULT 1,
  related_module  VARCHAR(50),    -- properties, leads, sales, payments, etc.
  related_id      INTEGER,
  access_roles    JSONB DEFAULT '["admin","manager"]',
  expires_at      DATE,
  uploaded_by     INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── COMMUNICATION LOGS ──────────────────────────────────────

CREATE TABLE IF NOT EXISTS communication_logs (
  id              SERIAL PRIMARY KEY,
  channel         VARCHAR(50) NOT NULL
                    CHECK (channel IN ('email','sms','whatsapp','call','note')),
  direction       VARCHAR(10) DEFAULT 'outbound'
                    CHECK (direction IN ('inbound','outbound')),
  lead_id         INTEGER REFERENCES leads(id) ON DELETE SET NULL,
  user_id         INTEGER REFERENCES users(id) ON DELETE SET NULL,
  subject         VARCHAR(255),
  body            TEXT,
  status          VARCHAR(50) DEFAULT 'sent',
  sent_at         TIMESTAMPTZ DEFAULT NOW(),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── AUDIT LOGS ──────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS audit_logs (
  id              SERIAL PRIMARY KEY,
  user_id         INTEGER REFERENCES users(id) ON DELETE SET NULL,
  action          VARCHAR(50) NOT NULL,   -- create, update, delete, login, logout
  module          VARCHAR(100) NOT NULL,
  record_id       INTEGER,
  before_value    JSONB,
  after_value     JSONB,
  ip_address      VARCHAR(45),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── SYSTEM SETTINGS ─────────────────────────────────────────

CREATE TABLE IF NOT EXISTS settings (
  id              SERIAL PRIMARY KEY,
  key             VARCHAR(100) UNIQUE NOT NULL,
  value           TEXT,
  description     TEXT,
  updated_by      INTEGER REFERENCES users(id) ON DELETE SET NULL,
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── INDEXES ─────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_properties_status   ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_type     ON properties(type);
CREATE INDEX IF NOT EXISTS idx_leads_status        ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to   ON leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_sales_stage         ON sales(stage);
CREATE INDEX IF NOT EXISTS idx_payments_status     ON payments(status);
CREATE INDEX IF NOT EXISTS idx_site_visits_date    ON site_visits(visit_date);
CREATE INDEX IF NOT EXISTS idx_audit_logs_module   ON audit_logs(module);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user     ON audit_logs(user_id);

-- ─── DEFAULT SETTINGS ────────────────────────────────────────

INSERT INTO settings (key, value, description) VALUES
  ('company_name',        'Real Estate Portal',   'Company display name'),
  ('company_email',       'hello@realestate.com', 'Primary contact email'),
  ('company_phone',       '+234 800 000 0000',    'Primary contact phone'),
  ('company_address',     '123 Main Street, Lagos, Nigeria', 'Office address'),
  ('default_currency',    'NGN',                  'Default currency code'),
  ('commission_rate',     '5',                    'Default agent commission %'),
  ('payment_gateway',     'paystack',             'Active payment gateway'),
  ('whatsapp_enabled',    'true',                 'Enable WhatsApp notifications'),
  ('email_notifications', 'true',                 'Enable email notifications')
ON CONFLICT (key) DO NOTHING;
