import { Permission, Role } from "../types/permission.types";

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  owner: [
    Permission.USERS_VIEW,
    Permission.USERS_MANAGE,
    Permission.ORG_VIEW,
    Permission.ORG_MANAGE,
    Permission.SETTINGS_VIEW,
    Permission.SETTINGS_MANAGE,
    Permission.FINANCE_VIEW,
    Permission.FINANCE_MANAGE,
    Permission.TASKS_VIEW,
    Permission.TASKS_MANAGE,
  ],
  admin: [
    Permission.USERS_VIEW,
    Permission.USERS_MANAGE,
    Permission.ORG_VIEW,
    Permission.SETTINGS_VIEW,
    Permission.FINANCE_VIEW,
    Permission.TASKS_VIEW,
    Permission.TASKS_MANAGE,
  ],
  member: [
    Permission.ORG_VIEW,
    Permission.TASKS_VIEW,
  ],
};
