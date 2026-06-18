import { useAuthStore } from "@/stores/useAuthStore";
import { Permission } from "../types/permission.types";

export function usePermission() {
  const { user, isAuthenticated } = useAuthStore();

  const hasPermission = (permission: Permission): boolean => {
    if (!isAuthenticated || !user) return false;
    return user.permissions.includes(permission);
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    if (!isAuthenticated || !user) return false;
    return permissions.some((permission) => user.permissions.includes(permission));
  };

  const hasRole = (role: string): boolean => {
    if (!isAuthenticated || !user) return false;
    return user.roles.includes(role);
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasRole,
    user,
    isAuthenticated,
  };
}
