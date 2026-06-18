import React from "react";
import { Permission } from "../types/permission.types";
import { usePermission } from "../hooks/usePermission";

interface PermissionGuardProps {
  permission?: Permission;
  permissions?: Permission[];
  requireAll?: boolean;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function PermissionGuard({
  permission,
  permissions,
  requireAll = false,
  fallback = null,
  children,
}: PermissionGuardProps) {
  const { hasPermission, user, isAuthenticated } = usePermission();

  if (!isAuthenticated || !user) {
    return <>{fallback}</>;
  }

  // 1. Single Permission Guard
  if (permission) {
    if (hasPermission(permission)) {
      return <>{children}</>;
    }
    return <>{fallback}</>;
  }

  // 2. Multiple Permissions Guard
  if (permissions && permissions.length > 0) {
    const results = permissions.map((p) => user.permissions.includes(p));
    const isAuthorized = requireAll
      ? results.every((res) => res === true)
      : results.some((res) => res === true);

    if (isAuthorized) {
      return <>{children}</>;
    }
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
