/**
 * JWT authentication helpers.
 * Signs and verifies tokens using the JWT_SECRET environment variable.
 */

import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "change_me_in_production";
const EXPIRES_IN = "7d";

export function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

/**
 * Extract and verify the Bearer token from a Next.js Request object.
 * Returns the decoded payload or null.
 */
export function getTokenPayload(request) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;
  if (!token) return null;
  return verifyToken(token);
}
