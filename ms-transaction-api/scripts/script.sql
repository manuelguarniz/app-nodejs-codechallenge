-- Script start dababase schema

CREATE EXTENSION "uuid-ossp";

create TABLE transactions (
  id UUID PRIMARY key default uuid_generate_v4(),
  account_external_id_debit UUID NOT NULL,
  account_external_id_credit UUID NOT NULL,
  transaction_type_id INT NOT null references transaction_types(id) on delete no action,
  value NUMERIC(10, 2) NOT null,
  transaction_status_id INT NOT NULL references transaction_statuses(id) on delete no action,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE transaction_types (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

INSERT INTO transaction_types (id, name) VALUES (1, 'transferencia');

create TABLE transaction_statuses (
  id INT PRIMARY KEY,
  name VARCHAR(20) UNIQUE NOT NULL
);

INSERT INTO transaction_statuses (id, name) VALUES (1, 'pending'), (2, 'approved'), (3, 'rejected');

CREATE TABLE transaction_audit_logs (
  id SERIAL PRIMARY KEY,
  transaction_id UUID NOT NULL,
  previous_status VARCHAR(20),
  new_status VARCHAR(20),
  changed_at TIMESTAMP DEFAULT NOW(),
  reason TEXT,
  source_service VARCHAR(50)
);
