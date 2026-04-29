/**
 * GET  /api/payments/:id  — get single payment
 * PUT  /api/payments/:id  — update payment status
 */

import { getDb } from "@/lib/db";
import { authorize } from "@/lib/middleware";
import { writeAuditLog } from "@/lib/auditLog";
import { ok, notFound, badRequest, serverError } from "@/lib/apiResponse";

export async function GET(request, { params }) {
  const { user, error } = authorize(request, "payments", "read");
  if (error) return error;

  try {
    const db = getDb();
    const result = await db.query(
      `SELECT py.*, p.title AS property_title
       FROM payments py
       LEFT JOIN properties p ON p.id = py.property_id
       WHERE py.id = $1`,
      [params.id]
    );
    if (!result.rows[0]) return notFound("Payment not found.");
    return ok(result.rows[0]);
  } catch (err) {
    console.error("[GET /api/payments/:id]", err);
    return serverError();
  }
}

export async function PUT(request, { params }) {
  const { user, error } = authorize(request, "payments", "update");
  if (error) return error;

  try {
    const db = getDb();
    const existing = await db.query("SELECT * FROM payments WHERE id = $1", [params.id]);
    if (!existing.rows[0]) return notFound("Payment not found.");

    const before = existing.rows[0];
    const body = await request.json();

    const fieldMap = {
      status: "status", paymentDate: "payment_date", dueDate: "due_date",
      receiptUrl: "receipt_url", notes: "notes", paymentMethod: "payment_method",
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
      `UPDATE payments SET ${updates.join(", ")} WHERE id = $${idx} RETURNING *`,
      values
    );

    await writeAuditLog({
      userId: user.id,
      action: "update",
      module: "payments",
      recordId: before.id,
      before,
      after: result.rows[0],
    });

    return ok(result.rows[0]);
  } catch (err) {
    console.error("[PUT /api/payments/:id]", err);
    return serverError();
  }
}
