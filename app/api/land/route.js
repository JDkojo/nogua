/**
 * GET  /api/land  — list land records
 * POST /api/land  — create a land record
 */

import { getDb } from "@/lib/db";
import { authorize } from "@/lib/middleware";
import { writeAuditLog } from "@/lib/auditLog";
import { ok, created, badRequest, serverError } from "@/lib/apiResponse";

export async function GET(request) {
  const { user, error } = authorize(request, "land", "read");
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const legalStatus = searchParams.get("legalStatus");
    const page  = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, parseInt(searchParams.get("limit") || "20", 10));
    const offset = (page - 1) * limit;

    const conditions = [];
    const params = [];
    let idx = 1;

    if (legalStatus) { conditions.push(`lr.legal_status = $${idx++}`); params.push(legalStatus); }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const db = getDb();
    const [dataResult, countResult] = await Promise.all([
      db.query(
        `SELECT lr.*, p.title AS property_title, p.address AS property_address
         FROM land_records lr
         LEFT JOIN properties p ON p.id = lr.property_id
         ${where}
         ORDER BY lr.created_at DESC
         LIMIT $${idx} OFFSET $${idx + 1}`,
        [...params, limit, offset]
      ),
      db.query(`SELECT COUNT(*) FROM land_records lr ${where}`, params),
    ]);

    const total = parseInt(countResult.rows[0].count, 10);
    return ok({
      records: dataResult.rows,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error("[GET /api/land]", err);
    return serverError();
  }
}

export async function POST(request) {
  const { user, error } = authorize(request, "land", "create");
  if (error) return error;

  try {
    const body = await request.json();
    const {
      propertyId, ownerName, titleNumber, titleType,
      acquisitionDate, legalStatus = "valid", documents = [],
    } = body;

    if (!ownerName) return badRequest("ownerName is required.");

    const db = getDb();
    const result = await db.query(
      `INSERT INTO land_records
         (property_id, owner_name, title_number, title_type,
          acquisition_date, legal_status, documents)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [
        propertyId || null, ownerName, titleNumber, titleType,
        acquisitionDate || null, legalStatus, JSON.stringify(documents),
      ]
    );

    const record = result.rows[0];
    await writeAuditLog({
      userId: user.id,
      action: "create",
      module: "land",
      recordId: record.id,
      after: record,
    });

    return created(record);
  } catch (err) {
    console.error("[POST /api/land]", err);
    return serverError();
  }
}
