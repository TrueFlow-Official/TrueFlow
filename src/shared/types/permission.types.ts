export enum Permission {
  // User Management Permissions
  USERS_VIEW = "users:view",
  USERS_MANAGE = "users:manage",

  // Organization Settings Permissions
  ORG_VIEW = "org:view",
  ORG_MANAGE = "org:manage",

  // Global Settings Permissions
  SETTINGS_VIEW = "settings:view",
  SETTINGS_MANAGE = "settings:manage",

  // Future Finance & Billing Permissions
  FINANCE_VIEW = "finance:view",
  FINANCE_MANAGE = "finance:manage",

  // Future Task Management Permissions
  TASKS_VIEW = "tasks:view",
  TASKS_MANAGE = "tasks:manage",
}

export type Role = "owner" | "admin" | "member";
