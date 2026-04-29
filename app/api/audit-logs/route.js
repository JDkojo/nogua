/**
 * GET /api/audit-logs  — read audit trail (admin only)
 */

import { getDb } from "@/lib/db";
import { authorize } from "@/lib/middleware";
import { ok, serverError } from "@/lib/apiResponse";

export async function GET(request) {
  const { user, error } = authorize(request, "audit", "read");
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const module  = searchParams.get("module");
    const userId  = searchParams.get("userId");
    const action  = searchParams.get("action");
    const page    = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit   = Math.min(200, parseInt(searchParams.get("limit") || "50", 10));
    const offset  = (page - 1) * limit;

    const conditions = [];
    const params = [];
    let idx = 1;

    if (module)  { conditions.push(`al.module = $${idx++}`);  params.push(module); }
    if (userId)  { conditions.push(`al.user_id = $${idx++}`); params.push(Number(userId)); }
    if (action)  { conditions.push(`al.action = $${idx++}`);  params.push(action); }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const db = getDb();
    const [dataResult, countResult] = await Promise.all([
      db.query(
        `SELECT al.*, u.first_name || ' ' || u.last_name AS user_name, u.email AS user_email
         FROM audit_logs al
         LEFT JOIN users u ON u.id = al.user_id
         ${where}
         ORDER BY al.created_at DESC
         LIMIT $${idx} OFFSET $${idx + 1}`,
        [...params, limit, offset]
      ),
      db.query(`SELECT COUNT(*) FROM audit_logs al ${where}`, params),
    ]);

    const total = parseInt(countResult.rows[0].count, 10);
    return ok({
      logs: dataResult.rows,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error("[GET /api/audit-logs]", err);
    return serverError();
  }
}
