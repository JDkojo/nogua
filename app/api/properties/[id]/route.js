/**
 * GET    /api/properties/:id  — get single property (public)
 * PUT    /api/properties/:id  — update property (admin/manager)
 * DELETE /api/properties/:id  — delete property (admin)
 */

import { getDb } from "@/lib/db";
import { authorize } from "@/lib/middleware";
import { writeAuditLog } from "@/lib/auditLog";
import { ok, badRequest, notFound, serverError } from "@/lib/apiResponse";

export async function GET(request, { params }) {
  try {
    const db = getDb();
    const result = await db.query(
      `SELECT p.*, u.first_name || ' ' || u.last_name AS agent_name,
              u.phone AS agent_phone, u.email AS agent_email
       FROM properties p
       LEFT JOIN users u ON u.id = p.assigned_agent
       WHERE p.id = $1 OR p.uuid::text = $1`,
      [params.id]
    );
    if (!result.rows[0]) return notFound("Property not found.");
    return ok(result.rows[0]);
  } catch (err) {
    console.error("[GET /api/properties/:id]", err);
    return serverError();
  }
}

export async function PUT(request, { params }) {
  const { user, error } = authorize(request, "properties", "update");
  if (error) return error;

  try {
    const db = getDb();
    const existing = await db.query(
      "SELECT * FROM properties WHERE id = $1 OR uuid::text = $1",
      [params.id]
    );
    if (!existing.rows[0]) return notFound("Property not found.");

    const before = existing.rows[0];
    const body = await request.json();

    const fields = [
      "title","description","type","status","price","address","city","state",
      "country","latitude","longitude","bedrooms","bathrooms","area_sqm",
      "features","media","assigned_agent",
    ];
    const updates = [];
    const values = [];
    let idx = 1;

    const keyMap = {
      areaSqm: "area_sqm",
      assignedAgent: "assigned_agent",
    };

    for (const field of fields) {
      const bodyKey = Object.keys(keyMap).find((k) => keyMap[k] === field) || field;
      if (body[bodyKey] !== undefined) {
        updates.push(`${field} = $${idx++}`);
        const val = ["features","media"].includes(field)
          ? JSON.stringify(body[bodyKey])
          : body[bodyKey];
        values.push(val);
      }
    }

    if (!updates.length) return badRequest("No fields to update.");

    updates.push(`updated_at = NOW()`);
    values.push(before.id);

    const result = await db.query(
      `UPDATE properties SET ${updates.join(", ")} WHERE id = $${idx} RETURNING *`,
      values
    );

    await writeAuditLog({
      userId: user.id,
      action: "update",
      module: "properties",
      recordId: before.id,
      before,
      after: result.rows[0],
    });

    return ok(result.rows[0]);
  } catch (err) {
    console.error("[PUT /api/properties/:id]", err);
    return serverError();
  }
}

export async function DELETE(request, { params }) {
  const { user, error } = authorize(request, "properties", "delete");
  if (error) return error;

  try {
    const db = getDb();
    const existing = await db.query(
      "SELECT * FROM properties WHERE id = $1 OR uuid::text = $1",
      [params.id]
    );
    if (!existing.rows[0]) return notFound("Property not found.");

    await db.query("DELETE FROM properties WHERE id = $1", [existing.rows[0].id]);

    await writeAuditLog({
      userId: user.id,
      action: "delete",
      module: "properties",
      recordId: existing.rows[0].id,
      before: existing.rows[0],
    });

    return ok({ message: "Property deleted." });
  } catch (err) {
    console.error("[DELETE /api/properties/:id]", err);
    return serverError();
  }
}
