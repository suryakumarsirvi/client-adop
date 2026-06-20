import { HasPermission } from '@/components/auth/HasPermission';
import { useTenant } from '@/hooks/useTenant';
import { useTheme } from '@/context/ThemeProvider';
import { useEffect } from 'react';
import { Users, BarChart3, HelpCircle, ShieldAlert, Check, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function DashboardOverview() {
  const { subdomain, activeTenant } = useTenant();
  const { applyTenantColors } = useTheme();

  const companyName = activeTenant?.companyName || (subdomain ? subdomain.charAt(0).toUpperCase() + subdomain.slice(1) : 'Default Organization');
  const planName = activeTenant?.planDetails?.name || 'Growth Tier';
  const seatsLimit = activeTenant?.planDetails?.seatsLimit || 20;
  const mauLimit = activeTenant?.planDetails?.mauLimit || 50000;
  const flowLimit = activeTenant?.planDetails?.flowLimit || 10;
  const features = activeTenant?.planDetails?.features || { analytics_dashboard: true, custom_css: false };

  useEffect(() => {
    if (activeTenant?.planCode === 'enterprise_custom_v1') {
      applyTenantColors({
        primary: '#a855f7', 
        secondary: '#7e22ce', 
        accent: '#c084fc',
      });
    } else if (activeTenant?.planCode === 'starter') {
      applyTenantColors({
        primary: '#3b82f6', 
        secondary: '#1d4ed8', 
        accent: '#60a5fa',
      });
    } else {
      applyTenantColors(null);
    }
  }, [activeTenant, applyTenantColors]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Badge variant="outline" className="mb-2 text-xs font-medium uppercase tracking-wider">
            {planName} Workspace
          </Badge>
          <h1 className="text-3xl font-light tracking-tight">{companyName} Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Managing guides and tours for subdomain{' '}
            <code className="text-primary bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
              {subdomain}.localhost
            </code>
            .
          </p>
        </div>

        {activeTenant?.simulated && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400 text-xs font-medium">
            <ShieldAlert className="h-4 w-4" />
            <span>Simulation Mode (Backend Offline)</span>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg font-light tracking-tight mb-4">Subscription Usage Limits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Team Seats</span>
                <span className="text-3xl font-light text-primary">1 / {seatsLimit}</span>
                <span className="text-xs text-muted-foreground">Authorized admin log accounts</span>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <Users className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Monthly Active Users</span>
                <span className="text-3xl font-light text-primary">0 / {mauLimit.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground">Client SDK tracker queries</span>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <BarChart3 className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Walkthrough Flows</span>
                <span className="text-3xl font-light text-primary">0 / {flowLimit}</span>
                <span className="text-xs text-muted-foreground">Live active user widgets</span>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <HelpCircle className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-light tracking-tight">Plan Feature Matrix</CardTitle>
          <CardDescription>Feature availability based on your current subscription plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
              <span className="font-medium text-sm">Analytics Dashboard Access</span>
              <Badge variant={features.analytics_dashboard ? 'default' : 'destructive'} className="text-xs">
                {features.analytics_dashboard ? (
                  <span className="flex items-center gap-1"><Check className="h-3 w-3" /> Enabled</span>
                ) : (
                  <span className="flex items-center gap-1"><X className="h-3 w-3" /> Disabled</span>
                )}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
              <span className="font-medium text-sm">Custom Styling (CSS Scoping)</span>
              <Badge variant={features.custom_css ? 'default' : 'destructive'} className="text-xs">
                {features.custom_css ? (
                  <span className="flex items-center gap-1"><Check className="h-3 w-3" /> Enabled</span>
                ) : (
                  <span className="flex items-center gap-1"><X className="h-3 w-3" /> Disabled</span>
                )}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <HasPermission perform="flow:create">
        <Card className="border-0 shadow-sm bg-primary/5 border-primary/20">
          <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base font-medium text-primary">Authoring Panel Enabled</CardTitle>
              <CardDescription className="mt-0.5">
                As an Administrator of {companyName}, you have creation privileges.
              </CardDescription>
            </div>
            <Button className="shrink-0" onClick={() => {/* navigate to flow builder */}}>
              Open Flow Builder
            </Button>
          </CardContent>
        </Card>
      </HasPermission>
    </div>
  );
}