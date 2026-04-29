/**
 * GET  /api/sales/:id  — get single sale
 * PUT  /api/sales/:id  — update sale stage / details
 */

import { getDb } from "@/lib/db";
import { authorize } from "@/lib/middleware";
import { writeAuditLog } from "@/lib/auditLog";
import { ok, notFound, badRequest, serverError } from "@/lib/apiResponse";

export async function GET(request, { params }) {
  const { user, error } = authorize(request, "sales", "read");
  if (error) return error;

  try {
    const db = getDb();
    const result = await db.query(
      `SELECT s.*,
              p.title AS property_title, p.price AS property_price,
              l.first_name || ' ' || l.last_name AS client_name,
              u.first_name || ' ' || u.last_name AS agent_name
       FROM sales s
       LEFT JOIN properties p ON p.id = s.property_id
       LEFT JOIN leads l ON l.id = s.lead_id
       LEFT JOIN users u ON u.id = s.agent_id
       WHERE s.id = $1`,
      [params.id]
    );
    if (!result.rows[0]) return notFound("Sale not found.");
    return ok(result.rows[0]);
  } catch (err) {
    console.error("[GET /api/sales/:id]", err);
    return serverError();
  }
}

export async function PUT(request, { params }) {
  const { user, error } = authorize(request, "sales", "update");
  if (error) return error;

  try {
    const db = getDb();
    const existing = await db.query("SELECT * FROM sales WHERE id = $1", [params.id]);
    if (!existing.rows[0]) return notFound("Sale not found.");

    const before = existing.rows[0];
    const body = await request.json();

    const fieldMap = {
      stage: "stage", salePrice: "sale_price", commissionRate: "commission_rate",
      commissionAmt: "commission_amt", expectedClose: "expected_close",
      closedAt: "closed_at", notes: "notes", agentId: "agent_id",
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

    // Auto-set closed_at when stage becomes "completed"
    if (body.stage === "completed" && !body.closedAt) {
      updates.push(`closed_at = NOW()`);
    }

    if (!updates.length) return badRequest("No fields to update.");
    updates.push(`updated_at = NOW()`);
    values.push(before.id);

    const result = await db.query(
      `UPDATE sales SET ${updates.join(", ")} WHERE id = $${idx} RETURNING *`,
      values
    );

    await writeAuditLog({
      userId: user.id,
      action: "update",
      module: "sales",
      recordId: before.id,
      before,
      after: result.rows[0],
    });

    return ok(result.rows[0]);
  } catch (err) {
    console.error("[PUT /api/sales/:id]", err);
    return serverError();
  }
}
