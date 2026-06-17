import { Navigate, Outlet } from 'react-router';
import { usePermission } from '@/context/PermissionProvider';

export function PermissionGuard({
  requiredPermission,
  anyOf,
  allOf,
  fallbackPath = '/forbidden',
}) {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermission();

  const isAuthorized = requiredPermission
    ? hasPermission(requiredPermission)
    : anyOf
      ? hasAnyPermission(anyOf)
      : allOf
        ? hasAllPermissions(allOf)
        : true;

  if (!isAuthorized) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <Outlet />;
}
