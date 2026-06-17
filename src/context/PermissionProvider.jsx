/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const PermissionContext = createContext(null);

export function PermissionProvider({ children, initialPermissions = [] }) {
  const [permissions, setPermissions] = useState(initialPermissions);

  const hasPermission = (required) => {
    if (!required) return true;
    if (permissions.includes('*')) return true; // Superadmin

    // Exact match
    if (permissions.includes(required)) return true;

    // Wildcard prefix matching, e.g., "flow:*" matches "flow:create"
    return permissions.some((perm) => {
      if (perm.endsWith('*')) {
        const prefix = perm.slice(0, -1);
        return required.startsWith(prefix);
      }
      return false;
    });
  };

  const hasAllPermissions = (requiredList) => {
    if (!Array.isArray(requiredList)) return false;
    return requiredList.every((perm) => hasPermission(perm));
  };

  const hasAnyPermission = (requiredList) => {
    if (!Array.isArray(requiredList)) return false;
    return requiredList.some((perm) => hasPermission(perm));
  };

  const value = {
    permissions,
    setPermissions,
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
  };

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermission() {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error('usePermission must be used within PermissionProvider');
  }
  return context;
}
