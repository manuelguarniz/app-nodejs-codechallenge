-- Script start dababase schema

CREATE EXTENSION "uuid-ossp";

create TABLE transactions (
  id UUID PRIMARY key default uuid_generate_v4(),
  account_external_id_debit UUID NOT NULL,
  account_external_id_credit UUID NOT NULL,
  transaction_type_id INT NOT null references transaction_types(id),
  value NUMERIC(10, 2) NOT null,
  transaction_status_id INT NOT NULL references transaction_statuses(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE transaction_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

INSERT INTO transaction_types (name) VALUES ('transferencia');

CREATE TABLE transaction_statuses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) UNIQUE NOT NULL
);

INSERT INTO transaction_statuses (name) VALUES ('pending'), ('approved'), ('rejected');

CREATE TABLE transaction_audit_logs (
  id SERIAL PRIMARY KEY,
  transaction_id UUID NOT NULL,
  previous_status VARCHAR(20),
  new_status VARCHAR(20),
  changed_at TIMESTAMP DEFAULT NOW(),
  reason TEXT,
  source_service VARCHAR(50)
);
