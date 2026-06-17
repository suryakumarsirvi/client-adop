import { RouterProvider } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

// Store & Stack config
import { store } from './App.store';
import { queryClient } from './App.stack';

// Providers
import { ThemeProvider } from '@/context/ThemeProvider';
import { PermissionProvider } from '@/context/PermissionProvider';
import { router } from './App.route';
import { getSubdomain } from '@/hooks/useTenant';

const App = () => {
  // If a tenant subdomain is active, auto-seed admin permissions for mock simulation
  const isSubdomainActive = !!getSubdomain();
  const initialPermissions = isSubdomainActive ? ['*'] : [];

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <PermissionProvider initialPermissions={initialPermissions}>
            <RouterProvider router={router} />
            <Toaster richColors position="top-right" />
          </PermissionProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default App;
