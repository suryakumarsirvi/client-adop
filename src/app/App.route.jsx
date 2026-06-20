import { createBrowserRouter, Navigate } from 'react-router';
import { getSubdomain } from '@/hooks/useTenant';

// Layouts
import MainLayout from '@/layouts/MainLayout';

// Guards
import { PermissionGuard } from '@/guards/PermissionGuard';

// Views
import LandingPage from '@/features/landing/LandingPage';
import AuthPage from '@/features/auth/AuthPage';
import DashboardOverview from '@/features/dashboard/DashboardOverview';
import FlowsManagement from '@/features/dashboard/FlowsManagement';
import BrandingSettings from '@/features/dashboard/BrandingSettings';
import Forbidden from '@/components/errors/Forbidden';
import RouterErrorFallback from '@/errors/router.error';
import CreateApiKey from '@/features/dashboard/CreateApiKey';

const isSubdomainActive = !!getSubdomain();

export const router = createBrowserRouter([
  {
    path: '/',
    element: isSubdomainActive ? <Navigate to="/dashboard" replace /> : <LandingPage />,
    errorElement: <RouterErrorFallback />,
  },
  {
    path: '/auth',
    element: isSubdomainActive ? <Navigate to="/dashboard" replace /> : <AuthPage />,
    errorElement: <RouterErrorFallback />,
  },
  {
    path: '/dashboard',
    element: isSubdomainActive ? <MainLayout /> : <Navigate to="/auth" replace />,
    errorElement: <RouterErrorFallback />,
    children: [
      // View-only dashboard access check: allows admins, authors, and viewers in
      {
        element: <PermissionGuard anyOf={['dashboard:view', 'flow:view', 'settings:write']} fallbackPath="/forbidden" />,
        children: [
          {
            index: true,
            element: <DashboardOverview />,
          },
        ],
      },
      // Authoring/Flow management routes: requires flow:view
      {
        element: <PermissionGuard requiredPermission="flow:view" fallbackPath="/forbidden" />,
        children: [
          {
            path: 'flows',
            element: <FlowsManagement />,
          },
        ],
      },
      // Admin/Branding settings routes: requires settings:write
      {
        element: <PermissionGuard requiredPermission="settings:write" fallbackPath="/forbidden" />,
        children: [
          {
            path: 'settings',
            element: <BrandingSettings />,
          },
        ],
      },
      {
        element: <PermissionGuard requiredPermission="settings:write" fallbackPath="/forbidden" />,
        children: [
          {
            path: 'api',
            element: <CreateApiKey />,
          },
        ],
      },
    ],
  },
  {
    path: '/forbidden',
    element: <Forbidden />,
  },
  {
    path: '*',
    element: isSubdomainActive ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />,
  },
]);
export default router;
