/**
 * Database connection pool using PostgreSQL (pg).
 * Uses environment variable DATABASE_URL for the connection string.
 */

import { Pool } from "pg";

let pool;

export function getDb() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : false,
    });
  }
  return pool;
}
