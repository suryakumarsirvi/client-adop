import { usePermission } from '@/context/PermissionProvider';

export function HasPermission({
  perform,
  anyOf,
  allOf,
  children,
  fallback = null,
}) {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermission();

  const isAuthorized = perform
    ? hasPermission(perform)
    : anyOf
      ? hasAnyPermission(anyOf)
      : allOf
        ? hasAllPermissions(allOf)
        : true;

  return isAuthorized ? <>{children}</> : <>{fallback}</>;
}
