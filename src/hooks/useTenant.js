import { useMemo } from 'react';

export const getSubdomain = () => {
  const hostname = window.location.hostname;
  const parts = hostname.split('.');

  if (hostname.endsWith('localhost')) {
    if (parts.length > 1 && parts[0] !== 'localhost') {
      return parts[0];
    }
    return null;
  }

  if (parts.length > 2) {
    return parts[0];
  }

  return null;
};

export const getLocalTenants = () => {
  try {
    return JSON.parse(localStorage.getItem('dap_tenants') || '{}');
  } catch {
    return {};
  }
};

export const saveLocalTenant = (slug, tenantData) => {
  const tenants = getLocalTenants();
  tenants[slug] = {
    ...tenantData,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem('dap_tenants', JSON.stringify(tenants));
};

export function useTenant() {
  const subdomain = useMemo(() => getSubdomain(), []);

  const activeTenant = useMemo(() => {
    if (!subdomain) return null;
    const tenants = getLocalTenants();
    return tenants[subdomain] || null;
  }, [subdomain]);

  return {
    subdomain,
    isTenantWorkspace: !!subdomain,
    activeTenant,
    getLocalTenants,
    saveLocalTenant,
  };
}
export default useTenant;
