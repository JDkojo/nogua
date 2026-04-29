/**
 * GET  /api/staff  — list staff / agents
 * POST /api/staff  — create a staff member (admin only)
 */

import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import { authorize } from "@/lib/middleware";
import { writeAuditLog } from "@/lib/auditLog";
import { ok, created, badRequest, serverError } from "@/lib/apiResponse";

export async function GET(request) {
  const { user, error } = authorize(request, "staff", "read");
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");
    const page  = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, parseInt(searchParams.get("limit") || "20", 10));
    const offset = (page - 1) * limit;

    const conditions = [];
    const params = [];
    let idx = 1;

    if (role) { conditions.push(`u.role = $${idx++}`); params.push(role); }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const db = getDb();
    const [dataResult, countResult] = await Promise.all([
      db.query(
        `SELECT u.id, u.uuid, u.first_name, u.last_name, u.email, u.role,
                u.phone, u.avatar_url, u.is_active, u.last_login_at, u.created_at,
                COUNT(DISTINCT l.id) AS leads_count,
                COUNT(DISTINCT s.id) AS sales_count
         FROM users u
         LEFT JOIN leads l ON l.assigned_to = u.id
         LEFT JOIN sales s ON s.agent_id = u.id
         ${where}
         GROUP BY u.id
         ORDER BY u.created_at DESC
         LIMIT $${idx} OFFSET $${idx + 1}`,
        [...params, limit, offset]
      ),
      db.query(`SELECT COUNT(*) FROM users u ${where}`, params),
    ]);

    const total = parseInt(countResult.rows[0].count, 10);
    return ok({
      staff: dataResult.rows,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error("[GET /api/staff]", err);
    return serverError();
  }
}

export async function POST(request) {
  const { user, error } = authorize(request, "staff", "create");
  if (error) return error;

  try {
    const body = await request.json();
    const { firstName, lastName, email, password, phone, role = "agent" } = body;

    if (!firstName || !lastName || !email || !password) {
      return badRequest("firstName, lastName, email and password are required.");
    }

    const db = getDb();
    const existing = await db.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return badRequest("A user with this email already exists.");
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const result = await db.query(
      `INSERT INTO users (first_name, last_name, email, password_hash, phone, role)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING id, uuid, first_name, last_name, email, role, phone, created_at`,
      [firstName, lastName, email, passwordHash, phone || null, role]
    );

    const newUser = result.rows[0];
    await writeAuditLog({
      userId: user.id,
      action: "create",
      module: "staff",
      recordId: newUser.id,
      after: { email: newUser.email, role: newUser.role },
    });

    return created(newUser);
  } catch (err) {
    console.error("[POST /api/staff]", err);
    return serverError();
  }
}
