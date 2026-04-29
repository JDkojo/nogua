/**
 * GET  /api/visits  — list site visits
 * POST /api/visits  — book a site visit (public)
 */

import { getDb } from "@/lib/db";
import { authorize } from "@/lib/middleware";
import { writeAuditLog } from "@/lib/auditLog";
import { sendEmail, templates } from "@/lib/notifications";
import { ok, created, badRequest, serverError } from "@/lib/apiResponse";

export async function GET(request) {
  const { user, error } = authorize(request, "visits", "read");
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const agentId = searchParams.get("agentId");
    const page  = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, parseInt(searchParams.get("limit") || "20", 10));
    const offset = (page - 1) * limit;

    const conditions = [];
    const params = [];
    let idx = 1;

    if (user.role === "agent") {
      conditions.push(`v.agent_id = $${idx++}`);
      params.push(user.id);
    } else if (agentId) {
      conditions.push(`v.agent_id = $${idx++}`);
      params.push(Number(agentId));
    }
    if (status) { conditions.push(`v.status = $${idx++}`); params.push(status); }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const db = getDb();
    const [dataResult, countResult] = await Promise.all([
      db.query(
        `SELECT v.*, p.title AS property_title, p.address AS property_address,
                u.first_name || ' ' || u.last_name AS agent_name
         FROM site_visits v
         LEFT JOIN properties p ON p.id = v.property_id
         LEFT JOIN users u ON u.id = v.agent_id
         ${where}
         ORDER BY v.visit_date ASC, v.visit_time ASC
         LIMIT $${idx} OFFSET $${idx + 1}`,
        [...params, limit, offset]
      ),
      db.query(`SELECT COUNT(*) FROM site_visits v ${where}`, params),
    ]);

    const total = parseInt(countResult.rows[0].count, 10);
    return ok({
      visits: dataResult.rows,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error("[GET /api/visits]", err);
    return serverError();
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      propertyId, clientName, clientEmail, clientPhone,
      visitDate, visitTime, notes,
    } = body;

    if (!propertyId || !clientName || !visitDate) {
      return badRequest("propertyId, clientName and visitDate are required.");
    }

    const db = getDb();

    // Fetch property title for notifications
    const propResult = await db.query(
      "SELECT title FROM properties WHERE id = $1",
      [propertyId]
    );
    const propertyTitle = propResult.rows[0]?.title || "Property";

    const result = await db.query(
      `INSERT INTO site_visits
         (property_id, client_name, client_email, client_phone,
          visit_date, visit_time, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [propertyId, clientName, clientEmail, clientPhone, visitDate, visitTime || null, notes]
    );

    const visit = { ...result.rows[0], propertyTitle };

    await writeAuditLog({
      action: "create",
      module: "visits",
      recordId: visit.id,
      after: visit,
    });

    // Notify admin
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const tmpl = templates.visitBooked(visit);
      sendEmail({ to: adminEmail, ...tmpl }).catch(console.error);
    }

    // Confirm to client
    if (clientEmail) {
      sendEmail({
        to: clientEmail,
        subject: `Your site visit is confirmed — ${propertyTitle}`,
        html: `<p>Hi ${clientName},</p>
               <p>Your site visit for <strong>${propertyTitle}</strong> on
               <strong>${visitDate}</strong>${visitTime ? ` at ${visitTime}` : ""} has been booked.</p>
               <p>We'll be in touch to confirm the details.</p>`,
      }).catch(console.error);
    }

    return created(result.rows[0]);
  } catch (err) {
    console.error("[POST /api/visits]", err);
    return serverError();
  }
}
