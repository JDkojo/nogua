/**
 * GET  /api/settings  — read system settings
 * PUT  /api/settings  — update settings (admin only)
 */

import { getDb } from "@/lib/db";
import { authorize } from "@/lib/middleware";
import { writeAuditLog } from "@/lib/auditLog";
import { ok, badRequest, serverError } from "@/lib/apiResponse";

export async function GET(request) {
  const { user, error } = authorize(request, "settings", "read");
  if (error) return error;

  try {
    const db = getDb();
    const result = await db.query("SELECT key, value, description FROM settings ORDER BY key");
    // Convert rows to a key-value object
    const settings = Object.fromEntries(result.rows.map((r) => [r.key, r.value]));
    return ok(settings);
  } catch (err) {
    console.error("[GET /api/settings]", err);
    return serverError();
  }
}

export async function PUT(request) {
  const { user, error } = authorize(request, "settings", "update");
  if (error) return error;

  try {
    const body = await request.json();
    if (typeof body !== "object" || Array.isArray(body)) {
      return badRequest("Body must be a key-value object.");
    }

    const db = getDb();
    const entries = Object.entries(body);

    for (const [key, value] of entries) {
      await db.query(
        `INSERT INTO settings (key, value, updated_by, updated_at)
         VALUES ($1, $2, $3, NOW())
         ON CONFLICT (key) DO UPDATE
           SET value = EXCLUDED.value,
               updated_by = EXCLUDED.updated_by,
               updated_at = NOW()`,
        [key, String(value), user.id]
      );
    }

    await writeAuditLog({
      userId: user.id,
      action: "update",
      module: "settings",
      after: body,
    });

    return ok({ message: "Settings updated.", updated: entries.length });
  } catch (err) {
    console.error("[PUT /api/settings]", err);
    return serverError();
  }
}
