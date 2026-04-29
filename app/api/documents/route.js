/**
 * GET  /api/documents  — list documents
 * POST /api/documents  — upload a document (Cloudinary)
 */

import { getDb } from "@/lib/db";
import { authorize } from "@/lib/middleware";
import { writeAuditLog } from "@/lib/auditLog";
import { uploadFile } from "@/lib/cloudinary";
import { ok, created, badRequest, serverError } from "@/lib/apiResponse";

export async function GET(request) {
  const { user, error } = authorize(request, "documents", "read");
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const relatedModule = searchParams.get("module");
    const relatedId = searchParams.get("relatedId");
    const page  = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, parseInt(searchParams.get("limit") || "20", 10));
    const offset = (page - 1) * limit;

    const conditions = [];
    const params = [];
    let idx = 1;

    if (relatedModule) { conditions.push(`d.related_module = $${idx++}`); params.push(relatedModule); }
    if (relatedId)     { conditions.push(`d.related_id = $${idx++}`);     params.push(Number(relatedId)); }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const db = getDb();
    const [dataResult, countResult] = await Promise.all([
      db.query(
        `SELECT d.*, u.first_name || ' ' || u.last_name AS uploaded_by_name
         FROM documents d
         LEFT JOIN users u ON u.id = d.uploaded_by
         ${where}
         ORDER BY d.created_at DESC
         LIMIT $${idx} OFFSET $${idx + 1}`,
        [...params, limit, offset]
      ),
      db.query(`SELECT COUNT(*) FROM documents d ${where}`, params),
    ]);

    const total = parseInt(countResult.rows[0].count, 10);
    return ok({
      documents: dataResult.rows,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error("[GET /api/documents]", err);
    return serverError();
  }
}

export async function POST(request) {
  const { user, error } = authorize(request, "documents", "create");
  if (error) return error;

  try {
    const body = await request.json();
    const {
      title, type, fileData, relatedModule, relatedId,
      accessRoles, expiresAt,
    } = body;

    if (!title || !fileData) {
      return badRequest("title and fileData (base64) are required.");
    }

    const { url, publicId } = await uploadFile(fileData, "real-estate/documents");

    const db = getDb();
    const result = await db.query(
      `INSERT INTO documents
         (title, type, file_url, public_id, related_module, related_id,
          access_roles, expires_at, uploaded_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
      [
        title, type, url, publicId, relatedModule, relatedId || null,
        JSON.stringify(accessRoles || ["admin", "manager"]),
        expiresAt || null, user.id,
      ]
    );

    const doc = result.rows[0];
    await writeAuditLog({
      userId: user.id,
      action: "create",
      module: "documents",
      recordId: doc.id,
      after: { title: doc.title, type: doc.type, url: doc.file_url },
    });

    return created(doc);
  } catch (err) {
    console.error("[POST /api/documents]", err);
    return serverError();
  }
}
