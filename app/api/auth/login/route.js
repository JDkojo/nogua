/**
 * POST /api/auth/login
 * Authenticate a user and return a JWT.
 */

import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import { signToken } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";
import { ok, badRequest, unauthorized, serverError } from "@/lib/apiResponse";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return badRequest("Email and password are required.");
    }

    const db = getDb();
    const result = await db.query(
      `SELECT id, uuid, first_name, last_name, email, password_hash, role, is_active
       FROM users WHERE email = $1`,
      [email]
    );

    const user = result.rows[0];
    if (!user) return unauthorized("Invalid email or password.");
    if (!user.is_active) return unauthorized("Account is deactivated.");

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return unauthorized("Invalid email or password.");

    // Update last login
    await db.query("UPDATE users SET last_login_at = NOW() WHERE id = $1", [user.id]);

    const token = signToken({
      id: user.id,
      uuid: user.uuid,
      email: user.email,
      role: user.role,
    });

    const ipAddress = request.headers.get("x-forwarded-for") || null;
    await writeAuditLog({
      userId: user.id,
      action: "login",
      module: "auth",
      ipAddress,
    });

    const { password_hash, ...safeUser } = user;
    return ok({ user: safeUser, token });
  } catch (err) {
    console.error("[POST /api/auth/login]", err);
    return serverError();
  }
}
