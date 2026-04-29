/**
 * Database migration script.
 * Run with: node database/migrate.js
 *
 * Reads database/schema.sql and executes it against the DATABASE_URL.
 */

const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

async function migrate() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false,
  });

  const schemaPath = path.join(__dirname, "schema.sql");
  const sql = fs.readFileSync(schemaPath, "utf8");

  console.log("🔄 Running database migration…");
  try {
    await pool.query(sql);
    console.log("✅ Migration complete.");
  } catch (err) {
    console.error("❌ Migration failed:", err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrate();
