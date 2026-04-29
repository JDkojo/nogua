/**
 * GET    /api/leads/:id  — get single lead
 * PUT    /api/leads/:id  — update lead
 * DELETE /api/leads/:id  — delete lead (admin only)
 */

import { getDb } from "@/lib/db";
import { authorize } from "@/lib/middleware";
import { writeAuditLog } from "@/lib/auditLog";
import { ok, notFound, badRequest, serverError } from "@/lib/apiResponse";

export async function GET(request, { params }) {
  const { user, error } = authorize(request, "leads", "read");
  if (error) return error;

  try {
    const db = getDb();
    const result = await db.query(
      `SELECT l.*, u.first_name || ' ' || u.last_name AS assigned_to_name,
              p.title AS property_title
       FROM leads l
       LEFT JOIN users u ON u.id = l.assigned_to
       LEFT JOIN properties p ON p.id = l.property_id
       WHERE l.id = $1`,
      [params.id]
    );
    if (!result.rows[0]) return notFound("Lead not found.");
    return ok(result.rows[0]);
  } catch (err) {
    console.error("[GET /api/leads/:id]", err);
    return serverError();
  }
}

export async function PUT(request, { params }) {
  const { user, error } = authorize(request, "leads", "update");
  if (error) return error;

  try {
    const db = getDb();
    const existing = await db.query("SELECT * FROM leads WHERE id = $1", [params.id]);
    if (!existing.rows[0]) return notFound("Lead not found.");

    const before = existing.rows[0];
    const body = await request.json();

    const allowedFields = [
      "first_name","last_name","email","phone","interest","inquiry_type",
      "message","status","assigned_to","property_id","follow_up_date","notes",
    ];
    const fieldMap = {
      firstName: "first_name", lastName: "last_name", inquiryType: "inquiry_type",
      assignedTo: "assigned_to", propertyId: "property_id", followUpDate: "follow_up_date",
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
    for (const field of allowedFields) {
      if (body[field] !== undefined && !Object.values(fieldMap).includes(field)) {
        updates.push(`${field} = $${idx++}`);
        values.push(body[field]);
      }
    }

    if (!updates.length) return badRequest("No fields to update.");
    updates.push(`updated_at = NOW()`);
    values.push(before.id);

    const result = await db.query(
      `UPDATE leads SET ${updates.join(", ")} WHERE id = $${idx} RETURNING *`,
      values
    );

    await writeAuditLog({
      userId: user.id,
      action: "update",
      module: "leads",
      recordId: before.id,
      before,
      after: result.rows[0],
    });

    return ok(result.rows[0]);
  } catch (err) {
    console.error("[PUT /api/leads/:id]", err);
    return serverError();
  }
}

export async function DELETE(request, { params }) {
  const { user, error } = authorize(request, "leads", "delete");
  if (error) return error;

  try {
    const db = getDb();
    const existing = await db.query("SELECT * FROM leads WHERE id = $1", [params.id]);
    if (!existing.rows[0]) return notFound("Lead not found.");

    await db.query("DELETE FROM leads WHERE id = $1", [params.id]);

    await writeAuditLog({
      userId: user.id,
      action: "delete",
      module: "leads",
      recordId: existing.rows[0].id,
      before: existing.rows[0],
    });

    return ok({ message: "Lead deleted." });
  } catch (err) {
    console.error("[DELETE /api/leads/:id]", err);
    return serverError();
  }
}
