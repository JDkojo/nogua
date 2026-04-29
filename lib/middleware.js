/**
 * Reusable middleware helpers for API route handlers.
 */

import { getTokenPayload } from "./auth";
import { hasPermission } from "./rbac";
import { unauthorized, forbidden } from "./apiResponse";

/**
 * Authenticate a request. Returns the decoded token payload or
 * a 401 NextResponse if the token is missing / invalid.
 */
export function authenticate(request) {
  const payload = getTokenPayload(request);
  if (!payload) return { error: unauthorized() };
  return { user: payload };
}

/**
 * Authenticate AND authorise a request.
 * Returns { user } on success or { error: NextResponse } on failure.
 */
export function authorize(request, module, action) {
  const { user, error } = authenticate(request);
  if (error) return { error };
  if (!hasPermission(user.role, module, action)) {
    return { error: forbidden(`You do not have permission to ${action} ${module}`) };
  }
  return { user };
}
