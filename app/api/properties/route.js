/**
 * GET  /api/properties  — list / search properties (public)
 * POST /api/properties  — create a property (admin/manager)
 */

import { getDb } from "@/lib/db";
import { authorize } from "@/lib/middleware";
import { writeAuditLog } from "@/lib/auditLog";
import { ok, created, badRequest, serverError } from "@/lib/apiResponse";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type    = searchParams.get("type");
    const status  = searchParams.get("status") || "available";
    const city    = searchParams.get("city");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const bedrooms = searchParams.get("bedrooms");
    const page    = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit   = Math.min(50, parseInt(searchParams.get("limit") || "12", 10));
    const offset  = (page - 1) * limit;

    const conditions = [];
    const params = [];
    let idx = 1;

    if (status !== "all") {
      conditions.push(`p.status = $${idx++}`);
      params.push(status);
    }
    if (type) {
      conditions.push(`p.type = $${idx++}`);
      params.push(type);
    }
    if (city) {
      conditions.push(`p.city ILIKE $${idx++}`);
      params.push(`%${city}%`);
    }
    if (minPrice) {
      conditions.push(`p.price >= $${idx++}`);
      params.push(Number(minPrice));
    }
    if (maxPrice) {
      conditions.push(`p.price <= $${idx++}`);
      params.push(Number(maxPrice));
    }
    if (bedrooms) {
      conditions.push(`p.bedrooms >= $${idx++}`);
      params.push(Number(bedrooms));
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const db = getDb();
    const [dataResult, countResult] = await Promise.all([
      db.query(
        `SELECT p.id, p.uuid, p.title, p.type, p.status, p.price,
                p.address, p.city, p.state, p.bedrooms, p.bathrooms,
                p.area_sqm, p.media, p.features, p.created_at,
                u.first_name || ' ' || u.last_name AS agent_name
         FROM properties p
         LEFT JOIN users u ON u.id = p.assigned_agent
         ${where}
         ORDER BY p.created_at DESC
         LIMIT $${idx} OFFSET $${idx + 1}`,
        [...params, limit, offset]
      ),
      db.query(
        `SELECT COUNT(*) FROM properties p ${where}`,
        params
      ),
    ]);

    const total = parseInt(countResult.rows[0].count, 10);
    return ok({
      properties: dataResult.rows,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error("[GET /api/properties]", err);
    return serverError();
  }
}

export async function POST(request) {
  const { user, error } = authorize(request, "properties", "create");
  if (error) return error;

  try {
    const body = await request.json();
    const {
      title, description, type, status = "available", price,
      address, city, state, country, latitude, longitude,
      bedrooms, bathrooms, areaSqm, features = [], media = [],
      assignedAgent,
    } = body;

    if (!title || !type || !price || !address) {
      return badRequest("title, type, price and address are required.");
    }

    const db = getDb();
    const result = await db.query(
      `INSERT INTO properties
         (title, description, type, status, price, address, city, state, country,
          latitude, longitude, bedrooms, bathrooms, area_sqm, features, media,
          assigned_agent, created_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
       RETURNING *`,
      [
        title, description, type, status, price, address, city, state,
        country || "Nigeria", latitude, longitude, bedrooms, bathrooms,
        areaSqm, JSON.stringify(features), JSON.stringify(media),
        assignedAgent || null, user.id,
      ]
    );

    const property = result.rows[0];
    await writeAuditLog({
      userId: user.id,
      action: "create",
      module: "properties",
      recordId: property.id,
      after: property,
    });

    return created(property);
  } catch (err) {
    console.error("[POST /api/properties]", err);
    return serverError();
  }
}
