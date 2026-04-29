/**
 * GET /api/reports  — aggregated reporting & analytics
 *
 * Query params:
 *   type = overview | sales | leads | payments | properties
 *   from = ISO date string (default: 30 days ago)
 *   to   = ISO date string (default: today)
 */

import { getDb } from "@/lib/db";
import { authorize } from "@/lib/middleware";
import { ok, badRequest, serverError } from "@/lib/apiResponse";

export async function GET(request) {
  const { user, error } = authorize(request, "reports", "read");
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "overview";
    const to   = searchParams.get("to")   || new Date().toISOString().slice(0, 10);
    const from = searchParams.get("from") || new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);

    const db = getDb();

    if (type === "overview") {
      const [props, leads, sales, payments, visits] = await Promise.all([
        db.query(`SELECT
            COUNT(*) FILTER (WHERE status = 'available') AS available,
            COUNT(*) FILTER (WHERE status = 'sold')      AS sold,
            COUNT(*) FILTER (WHERE status = 'reserved')  AS reserved,
            COUNT(*)                                      AS total
          FROM properties`),
        db.query(`SELECT
            COUNT(*) FILTER (WHERE status = 'new')       AS new_leads,
            COUNT(*) FILTER (WHERE status = 'converted') AS converted,
            COUNT(*)                                      AS total
          FROM leads WHERE created_at BETWEEN $1 AND $2`, [from, to]),
        db.query(`SELECT
            COUNT(*) FILTER (WHERE stage = 'completed')  AS completed,
            COUNT(*)                                      AS total,
            COALESCE(SUM(sale_price) FILTER (WHERE stage = 'completed'), 0) AS revenue
          FROM sales WHERE created_at BETWEEN $1 AND $2`, [from, to]),
        db.query(`SELECT
            COALESCE(SUM(amount) FILTER (WHERE status = 'confirmed'), 0) AS confirmed_total,
            COUNT(*) FILTER (WHERE status = 'pending')   AS pending_count,
            COUNT(*)                                      AS total
          FROM payments WHERE created_at BETWEEN $1 AND $2`, [from, to]),
        db.query(`SELECT
            COUNT(*) FILTER (WHERE status = 'scheduled') AS scheduled,
            COUNT(*) FILTER (WHERE status = 'completed') AS completed,
            COUNT(*)                                      AS total
          FROM site_visits WHERE created_at BETWEEN $1 AND $2`, [from, to]),
      ]);

      return ok({
        period: { from, to },
        properties: props.rows[0],
        leads: leads.rows[0],
        sales: sales.rows[0],
        payments: payments.rows[0],
        visits: visits.rows[0],
      });
    }

    if (type === "sales") {
      const result = await db.query(
        `SELECT
           DATE_TRUNC('week', created_at) AS week,
           COUNT(*) AS count,
           COALESCE(SUM(sale_price), 0) AS revenue,
           stage
         FROM sales
         WHERE created_at BETWEEN $1 AND $2
         GROUP BY week, stage
         ORDER BY week ASC`,
        [from, to]
      );
      return ok({ period: { from, to }, data: result.rows });
    }

    if (type === "leads") {
      const result = await db.query(
        `SELECT
           DATE_TRUNC('week', created_at) AS week,
           COUNT(*) AS count,
           status,
           source
         FROM leads
         WHERE created_at BETWEEN $1 AND $2
         GROUP BY week, status, source
         ORDER BY week ASC`,
        [from, to]
      );
      return ok({ period: { from, to }, data: result.rows });
    }

    if (type === "payments") {
      const result = await db.query(
        `SELECT
           DATE_TRUNC('month', payment_date) AS month,
           COALESCE(SUM(amount) FILTER (WHERE status = 'confirmed'), 0) AS confirmed,
           COALESCE(SUM(amount) FILTER (WHERE status = 'pending'), 0)   AS pending,
           COUNT(*) AS count
         FROM payments
         WHERE payment_date BETWEEN $1 AND $2
         GROUP BY month
         ORDER BY month ASC`,
        [from, to]
      );
      return ok({ period: { from, to }, data: result.rows });
    }

    return badRequest(`Unknown report type: ${type}`);
  } catch (err) {
    console.error("[GET /api/reports]", err);
    return serverError();
  }
}
