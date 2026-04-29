/**
 * GET  /api/payments  — list payments
 * POST /api/payments  — record a payment
 */

import { getDb } from "@/lib/db";
import { authorize } from "@/lib/middleware";
import { writeAuditLog } from "@/lib/auditLog";
import { sendEmail, templates } from "@/lib/notifications";
import { ok, created, badRequest, serverError } from "@/lib/apiResponse";
import { randomUUID } from "crypto";

export async function GET(request) {
  const { user, error } = authorize(request, "payments", "read");
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const saleId = searchParams.get("saleId");
    const page  = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, parseInt(searchParams.get("limit") || "20", 10));
    const offset = (page - 1) * limit;

    const conditions = [];
    const params = [];
    let idx = 1;

    if (status) { conditions.push(`py.status = $${idx++}`); params.push(status); }
    if (saleId) { conditions.push(`py.sale_id = $${idx++}`); params.push(Number(saleId)); }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const db = getDb();
    const [dataResult, countResult] = await Promise.all([
      db.query(
        `SELECT py.*, p.title AS property_title,
                s.stage AS sale_stage
         FROM payments py
         LEFT JOIN properties p ON p.id = py.property_id
         LEFT JOIN sales s ON s.id = py.sale_id
         ${where}
         ORDER BY py.created_at DESC
         LIMIT $${idx} OFFSET $${idx + 1}`,
        [...params, limit, offset]
      ),
      db.query(`SELECT COUNT(*) FROM payments py ${where}`, params),
    ]);

    const total = parseInt(countResult.rows[0].count, 10);
    return ok({
      payments: dataResult.rows,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error("[GET /api/payments]", err);
    return serverError();
  }
}

export async function POST(request) {
  const { user, error } = authorize(request, "payments", "create");
  if (error) return error;

  try {
    const body = await request.json();
    const {
      saleId, leadId, propertyId, payerName, payerEmail,
      amount, currency = "NGN", paymentType = "installment",
      paymentMethod, reference, status = "pending",
      paymentDate, dueDate, notes,
    } = body;

    if (!payerName || !amount) {
      return badRequest("payerName and amount are required.");
    }

    const ref = reference || `REF-${Date.now()}-${randomUUID().slice(0, 8).toUpperCase()}`;

    const db = getDb();
    const result = await db.query(
      `INSERT INTO payments
         (sale_id, lead_id, property_id, payer_name, payer_email, amount,
          currency, payment_type, payment_method, reference, status,
          payment_date, due_date, notes, created_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
       RETURNING *`,
      [
        saleId || null, leadId || null, propertyId || null,
        payerName, payerEmail, amount, currency, paymentType,
        paymentMethod, ref, status, paymentDate || null,
        dueDate || null, notes, user.id,
      ]
    );

    const payment = result.rows[0];

    await writeAuditLog({
      userId: user.id,
      action: "create",
      module: "payments",
      recordId: payment.id,
      after: payment,
    });

    // Notify admin
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail && status === "confirmed") {
      const tmpl = templates.paymentReceived(payment);
      sendEmail({ to: adminEmail, ...tmpl }).catch(console.error);
    }

    return created(payment);
  } catch (err) {
    console.error("[POST /api/payments]", err);
    return serverError();
  }
}
