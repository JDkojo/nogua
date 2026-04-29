/**
 * Audit log helper — writes every significant action to the audit_logs table.
 */

import { getDb } from "./db";

/**
 * @param {object} params
 * @param {number|null} params.userId   - ID of the user performing the action
 * @param {string}      params.action   - e.g. "create", "update", "delete", "login"
 * @param {string}      params.module   - e.g. "properties", "leads", "payments"
 * @param {number|null} params.recordId - ID of the affected record (optional)
 * @param {object|null} params.before   - Snapshot before the change (optional)
 * @param {object|null} params.after    - Snapshot after the change (optional)
 * @param {string|null} params.ipAddress
 */
export async function writeAuditLog({
  userId = null,
  action,
  module,
  recordId = null,
  before = null,
  after = null,
  ipAddress = null,
}) {
  try {
    const db = getDb();
    await db.query(
      `INSERT INTO audit_logs
         (user_id, action, module, record_id, before_value, after_value, ip_address)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        userId,
        action,
        module,
        recordId,
        before ? JSON.stringify(before) : null,
        after ? JSON.stringify(after) : null,
        ipAddress,
      ]
    );
  } catch (err) {
    // Audit log failures must never crash the main request
    console.error("[AuditLog] Failed to write:", err.message);
  }
}
