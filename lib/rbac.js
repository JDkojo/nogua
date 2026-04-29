/**
 * Role-Based Access Control (RBAC) definitions.
 *
 * Roles (hierarchy, highest first):
 *   super_admin → admin → manager → agent → viewer
 *
 * Each role lists the modules and actions it can perform.
 */

export const ROLES = {
  super_admin: "super_admin",
  admin: "admin",
  manager: "manager",
  agent: "agent",
  viewer: "viewer",
};

/** Ordered hierarchy — index 0 is highest privilege */
const ROLE_HIERARCHY = [
  ROLES.super_admin,
  ROLES.admin,
  ROLES.manager,
  ROLES.agent,
  ROLES.viewer,
];

/**
 * Permissions map: role → set of "module:action" strings.
 * Higher roles inherit all permissions of lower roles automatically
 * via the hasPermission() helper.
 */
const PERMISSIONS = {
  super_admin: ["*:*"],
  admin: [
    "properties:*",
    "leads:*",
    "sales:*",
    "payments:*",
    "land:*",
    "documents:*",
    "visits:*",
    "staff:*",
    "reports:*",
    "settings:*",
    "audit:read",
    "users:*",
  ],
  manager: [
    "properties:read",
    "properties:create",
    "properties:update",
    "leads:*",
    "sales:*",
    "payments:read",
    "payments:create",
    "visits:*",
    "documents:read",
    "documents:create",
    "reports:read",
    "staff:read",
  ],
  agent: [
    "properties:read",
    "leads:read",
    "leads:create",
    "leads:update",
    "sales:read",
    "sales:create",
    "visits:read",
    "visits:create",
    "visits:update",
    "documents:read",
  ],
  viewer: ["properties:read", "leads:read", "reports:read"],
};

/**
 * Check whether a role has a given permission.
 * Supports wildcard "*:*" and "module:*".
 */
export function hasPermission(role, module, action) {
  const perms = PERMISSIONS[role] || [];
  if (perms.includes("*:*")) return true;
  if (perms.includes(`${module}:*`)) return true;
  if (perms.includes(`${module}:${action}`)) return true;
  return false;
}

/**
 * Returns true if roleA is at least as privileged as roleB.
 */
export function isAtLeastRole(roleA, roleB) {
  return ROLE_HIERARCHY.indexOf(roleA) <= ROLE_HIERARCHY.indexOf(roleB);
}
