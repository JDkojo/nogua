/**
 * POST /api/auth/register
 * Create a new user account (admin-only in production; open for first setup).
 */

import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import { signToken } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";
import { ok, badRequest, serverError } from "@/lib/apiResponse";

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password, phone, role = "viewer" } = body;

    if (!firstName || !lastName || !email || !password) {
      return badRequest("firstName, lastName, email and password are required.");
    }

    const db = getDb();

    // Check duplicate email
    const existing = await db.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return badRequest("An account with this email already exists.");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const result = await db.query(
      `INSERT INTO users (first_name, last_name, email, password_hash, phone, role)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, uuid, first_name, last_name, email, role, phone, created_at`,
      [firstName, lastName, email, passwordHash, phone || null, role]
    );

    const user = result.rows[0];
    const token = signToken({ id: user.id, uuid: user.uuid, email: user.email, role: user.role });

    await writeAuditLog({
      userId: user.id,
      action: "create",
      module: "users",
      recordId: user.id,
      after: { email: user.email, role: user.role },
    });

    return ok({ user, token }, 201);
  } catch (err) {
    console.error("[POST /api/auth/register]", err);
    return serverError();
  }
}
