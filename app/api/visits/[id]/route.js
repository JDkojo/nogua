/**
 * GET  /api/visits/:id  — get single visit
 * PUT  /api/visits/:id  — update visit status / outcome
 */

import { getDb } from "@/lib/db";
import { authorize } from "@/lib/middleware";
import { writeAuditLog } from "@/lib/auditLog";
import { ok, notFound, badRequest, serverError } from "@/lib/apiResponse";

export async function GET(request, { params }) {
  const { user, error } = authorize(request, "visits", "read");
  if (error) return error;

  try {
    const db = getDb();
    const result = await db.query(
      `SELECT v.*, p.title AS property_title, p.address AS property_address,
              u.first_name || ' ' || u.last_name AS agent_name
       FROM site_visits v
       LEFT JOIN properties p ON p.id = v.property_id
       LEFT JOIN users u ON u.id = v.agent_id
       WHERE v.id = $1`,
      [params.id]
    );
    if (!result.rows[0]) return notFound("Visit not found.");
    return ok(result.rows[0]);
  } catch (err) {
    console.error("[GET /api/visits/:id]", err);
    return serverError();
  }
}

export async function PUT(request, { params }) {
  const { user, error } = authorize(request, "visits", "update");
  if (error) return error;

  try {
    const db = getDb();
    const existing = await db.query("SELECT * FROM site_visits WHERE id = $1", [params.id]);
    if (!existing.rows[0]) return notFound("Visit not found.");

    const before = existing.rows[0];
    const body = await request.json();

    const fieldMap = {
      status: "status", outcome: "outcome", notes: "notes",
      agentId: "agent_id", visitDate: "visit_date", visitTime: "visit_time",
    };

    const updates = [];
    const values = [];
    let idx = 1;

    for (const [bodyKey, dbField] of Object.entries(fieldMap)) {
      if (body[bodyKey] !== undefined) {
        updates.push(`${dbField} = $${idx++}`);
        values.push(body[bodyKey]);
      }
    }

    if (!updates.length) return badRequest("No fields to update.");
    updates.push(`updated_at = NOW()`);
    values.push(before.id);

    const result = await db.query(
      `UPDATE site_visits SET ${updates.join(", ")} WHERE id = $${idx} RETURNING *`,
      values
    );

    await writeAuditLog({
      userId: user.id,
      action: "update",
      module: "visits",
      recordId: before.id,
      before,
      after: result.rows[0],
    });

    return ok(result.rows[0]);
  } catch (err) {
    console.error("[PUT /api/visits/:id]", err);
    return serverError();
  }
}
