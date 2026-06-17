import { HasPermission } from '@/components/auth/HasPermission';
import { useTenant } from '@/hooks/useTenant';
import { useTheme } from '@/context/ThemeProvider';
import { useEffect } from 'react';
import { Users, BarChart3, HelpCircle, ShieldAlert } from 'lucide-react';

export default function DashboardOverview() {
  const { subdomain, activeTenant } = useTenant();
  const { applyTenantColors } = useTheme();

  // Dynamically resolve tenant name & plan metadata
  const companyName = activeTenant?.companyName || (subdomain ? subdomain.charAt(0).toUpperCase() + subdomain.slice(1) : 'Default Organization');
  const planName = activeTenant?.planDetails?.name || 'Growth Tier';
  const seatsLimit = activeTenant?.planDetails?.seatsLimit || 20;
  const mauLimit = activeTenant?.planDetails?.mauLimit || 50000;
  const flowLimit = activeTenant?.planDetails?.flowLimit || 10;
  const features = activeTenant?.planDetails?.features || { analytics_dashboard: true, custom_css: false };

  // Set branding primary/secondary colors if they registered a custom plan
  useEffect(() => {
    if (activeTenant?.planCode === 'enterprise_custom_v1') {
      applyTenantColors({
        primary: '#a855f7', // purple-500
        secondary: '#7e22ce', // purple-700
        accent: '#c084fc', // purple-400
      });
    } else if (activeTenant?.planCode === 'starter') {
      applyTenantColors({
        primary: '#3b82f6', // blue-500
        secondary: '#1d4ed8', // blue-700
        accent: '#60a5fa', // blue-400
      });
    } else {
      // Default Growth Teal colors
      applyTenantColors(null);
    }
  }, [activeTenant, applyTenantColors]);

  return (
    <div className="flex flex-col gap-8 antialiased font-sans">
      
      {/* Welcome & Tenant Profile Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-brand-border pb-6">
        <div>
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-2.5 py-1 rounded-full">
            {planName} Workspace
          </span>
          <h1 className="text-3xl font-heading font-extrabold tracking-tight mt-3">
            {companyName} Dashboard
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Managing guides and tours for subdomain <code className="text-brand-primary font-mono bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-xs">{subdomain}.localhost</code>.
          </p>
        </div>

        {activeTenant?.simulated && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400 text-xs font-semibold">
            <ShieldAlert className="w-4 h-4" />
            <span>Simulation Mode (Backend Offline)</span>
          </div>
        )}
      </div>

      {/* Subscription Boundary Plan Limits */}
      <div>
        <h2 className="font-heading text-lg font-bold mb-4">Subscription Usage Limits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Seats Limit */}
          <div className="p-6 rounded-xl bg-brand-card border border-brand-border shadow-xs flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Team Seats</span>
              <span className="text-3xl font-black text-brand-primary">1 / {seatsLimit}</span>
              <span className="text-xs text-zinc-500 mt-1">Authorized admin log accounts</span>
            </div>
            <div className="p-3 bg-brand-primary/10 rounded-lg text-brand-primary">
              <Users className="w-5 h-5" />
            </div>
          </div>

          {/* MAU Limit */}
          <div className="p-6 rounded-xl bg-brand-card border border-brand-border shadow-xs flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Monthly Active Users</span>
              <span className="text-3xl font-black text-brand-secondary">0 / {mauLimit.toLocaleString()}</span>
              <span className="text-xs text-zinc-500 mt-1">Client SDK tracker queries</span>
            </div>
            <div className="p-3 bg-brand-secondary/10 rounded-lg text-brand-secondary">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>

          {/* Active Flow Limit */}
          <div className="p-6 rounded-xl bg-brand-card border border-brand-border shadow-xs flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Walkthrough Flows</span>
              <span className="text-3xl font-black text-brand-accent">0 / {flowLimit}</span>
              <span className="text-xs text-zinc-500 mt-1">Live active user widgets</span>
            </div>
            <div className="p-3 bg-brand-primary/10 rounded-lg text-brand-accent">
              <HelpCircle className="w-5 h-5" />
            </div>
          </div>

        </div>
      </div>

      {/* Feature Flag Verification Panel */}
      <div className="bg-brand-card rounded-xl border border-brand-border p-6 shadow-xs flex flex-col gap-4">
        <h3 className="font-heading font-bold text-base">Plan Feature Matrix</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          
          <div className="flex items-center justify-between p-3 rounded-lg bg-brand-bg border border-brand-border">
            <span className="font-medium">Analytics Dashboard Access</span>
            <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${features.analytics_dashboard ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'}`}>
              {features.analytics_dashboard ? 'Enabled' : 'Disabled'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-brand-bg border border-brand-border">
            <span className="font-medium">Custom Styling (CSS Scoping)</span>
            <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${features.custom_css ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'}`}>
              {features.custom_css ? 'Enabled' : 'Disabled'}
            </span>
          </div>

        </div>
      </div>

      {/* Dynamic Content Panel */}
      <HasPermission perform="flow:create">
        <div className="p-6 rounded-xl bg-brand-primary/5 border border-brand-primary/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-brand-primary">Authoring Panel Enabled</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">As an Administrator of {companyName}, you have creation privileges.</p>
          </div>
          <button className="px-5 py-2.5 bg-brand-primary hover:bg-brand-secondary text-white text-sm font-semibold rounded-lg shadow-sm transition cursor-pointer self-start md:self-auto">
            Open Flow Builder
          </button>
        </div>
      </HasPermission>

    </div>
  );
}
