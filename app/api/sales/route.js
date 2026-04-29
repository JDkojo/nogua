/**
 * GET  /api/sales  — list sales pipeline
 * POST /api/sales  — create a sale record
 */

import { getDb } from "@/lib/db";
import { authorize } from "@/lib/middleware";
import { writeAuditLog } from "@/lib/auditLog";
import { ok, created, badRequest, serverError } from "@/lib/apiResponse";

export async function GET(request) {
  const { user, error } = authorize(request, "sales", "read");
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const stage = searchParams.get("stage");
    const agentId = searchParams.get("agentId");
    const page  = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, parseInt(searchParams.get("limit") || "20", 10));
    const offset = (page - 1) * limit;

    const conditions = [];
    const params = [];
    let idx = 1;

    if (user.role === "agent") {
      conditions.push(`s.agent_id = $${idx++}`);
      params.push(user.id);
    } else if (agentId) {
      conditions.push(`s.agent_id = $${idx++}`);
      params.push(Number(agentId));
    }
    if (stage) {
      conditions.push(`s.stage = $${idx++}`);
      params.push(stage);
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const db = getDb();
    const [dataResult, countResult] = await Promise.all([
      db.query(
        `SELECT s.*,
                p.title AS property_title, p.price AS property_price,
                l.first_name || ' ' || l.last_name AS client_name,
                u.first_name || ' ' || u.last_name AS agent_name
         FROM sales s
         LEFT JOIN properties p ON p.id = s.property_id
         LEFT JOIN leads l ON l.id = s.lead_id
         LEFT JOIN users u ON u.id = s.agent_id
         ${where}
         ORDER BY s.created_at DESC
         LIMIT $${idx} OFFSET $${idx + 1}`,
        [...params, limit, offset]
      ),
      db.query(`SELECT COUNT(*) FROM sales s ${where}`, params),
    ]);

    const total = parseInt(countResult.rows[0].count, 10);
    return ok({
      sales: dataResult.rows,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error("[GET /api/sales]", err);
    return serverError();
  }
}

export async function POST(request) {
  const { user, error } = authorize(request, "sales", "create");
  if (error) return error;

  try {
    const body = await request.json();
    const {
      leadId, propertyId, agentId, stage = "prospect",
      salePrice, commissionRate = 5, expectedClose, notes,
    } = body;

    if (!propertyId) return badRequest("propertyId is required.");

    const commissionAmt = salePrice
      ? (Number(salePrice) * Number(commissionRate)) / 100
      : null;

    const db = getDb();
    const result = await db.query(
      `INSERT INTO sales
         (lead_id, property_id, agent_id, stage, sale_price,
          commission_rate, commission_amt, expected_close, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
      [
        leadId || null, propertyId, agentId || user.id, stage,
        salePrice || null, commissionRate, commissionAmt,
        expectedClose || null, notes,
      ]
    );

    const sale = result.rows[0];
    await writeAuditLog({
      userId: user.id,
      action: "create",
      module: "sales",
      recordId: sale.id,
      after: sale,
    });

    return created(sale);
  } catch (err) {
    console.error("[POST /api/sales]", err);
    return serverError();
  }
}
