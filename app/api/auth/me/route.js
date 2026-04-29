/**
 * GET /api/auth/me
 * Return the currently authenticated user's profile.
 */

import { getDb } from "@/lib/db";
import { authenticate } from "@/lib/middleware";
import { ok, serverError } from "@/lib/apiResponse";

export async function GET(request) {
  const { user, error } = authenticate(request);
  if (error) return error;

  try {
    const db = getDb();
    const result = await db.query(
      `SELECT id, uuid, first_name, last_name, email, role, phone, avatar_url,
              is_active, last_login_at, created_at
       FROM users WHERE id = $1`,
      [user.id]
    );
    return ok(result.rows[0] || null);
  } catch (err) {
    console.error("[GET /api/auth/me]", err);
    return serverError();
  }
}
