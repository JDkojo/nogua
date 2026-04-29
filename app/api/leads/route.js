/**
 * GET  /api/leads  — list leads (admin/manager/agent)
 * POST /api/leads  — create a lead (public — from website forms)
 */

import { getDb } from "@/lib/db";
import { authenticate, authorize } from "@/lib/middleware";
import { writeAuditLog } from "@/lib/auditLog";
import { sendEmail, templates } from "@/lib/notifications";
import { ok, created, badRequest, serverError } from "@/lib/apiResponse";

export async function GET(request) {
  const { user, error } = authorize(request, "leads", "read");
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const assignedTo = searchParams.get("assignedTo");
    const page  = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, parseInt(searchParams.get("limit") || "20", 10));
    const offset = (page - 1) * limit;

    const conditions = [];
    const params = [];
    let idx = 1;

    // Agents can only see their own leads
    if (user.role === "agent") {
      conditions.push(`l.assigned_to = $${idx++}`);
      params.push(user.id);
    } else if (assignedTo) {
      conditions.push(`l.assigned_to = $${idx++}`);
      params.push(Number(assignedTo));
    }

    if (status) {
      conditions.push(`l.status = $${idx++}`);
      params.push(status);
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const db = getDb();
    const [dataResult, countResult] = await Promise.all([
      db.query(
        `SELECT l.*, u.first_name || ' ' || u.last_name AS assigned_to_name,
                p.title AS property_title
         FROM leads l
         LEFT JOIN users u ON u.id = l.assigned_to
         LEFT JOIN properties p ON p.id = l.property_id
         ${where}
         ORDER BY l.created_at DESC
         LIMIT $${idx} OFFSET $${idx + 1}`,
        [...params, limit, offset]
      ),
      db.query(`SELECT COUNT(*) FROM leads l ${where}`, params),
    ]);

    const total = parseInt(countResult.rows[0].count, 10);
    return ok({
      leads: dataResult.rows,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error("[GET /api/leads]", err);
    return serverError();
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      firstName, lastName, email, phone, interest,
      inquiryType, message, source = "website", propertyId,
    } = body;

    if (!firstName || !lastName) {
      return badRequest("firstName and lastName are required.");
    }
    if (!email && !phone) {
      return badRequest("At least one of email or phone is required.");
    }

    const db = getDb();
    const result = await db.query(
      `INSERT INTO leads
         (first_name, last_name, email, phone, interest, inquiry_type,
          message, source, property_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
      [firstName, lastName, email, phone, interest, inquiryType, message, source, propertyId || null]
    );

    const lead = result.rows[0];

    await writeAuditLog({
      action: "create",
      module: "leads",
      recordId: lead.id,
      after: lead,
    });

    // Notify admin via email (non-blocking)
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const tmpl = templates.newLead(lead);
      sendEmail({ to: adminEmail, ...tmpl }).catch(console.error);
    }

    return created(lead);
  } catch (err) {
    console.error("[POST /api/leads]", err);
    return serverError();
  }
}
