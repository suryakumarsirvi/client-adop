import { useState } from 'react';
import { useTheme } from '@/context/ThemeProvider';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Palette, RotateCcw, CheckCircle2 } from 'lucide-react';

export default function BrandingSettings() {
  const { tenantColors, applyTenantColors } = useTheme();

  const [primary, setPrimary] = useState(tenantColors?.primary || '#4f46e5');
  const [secondary, setSecondary] = useState(tenantColors?.secondary || '#7c3aed');
  const [accent, setAccent] = useState(tenantColors?.accent || '#f59e0b');

  const handleApplyTheme = (e) => {
    e.preventDefault();
    applyTenantColors({
      primary,
      secondary,
      accent,
    });
    toast.success('Tenant theme applied and injected dynamically!');
  };

  const handleResetTheme = () => {
    applyTenantColors(null);
    setPrimary('#4f46e5');
    setSecondary('#7c3aed');
    setAccent('#f59e0b');
    toast.success('Tenant theme reset to system defaults.');
  };

  return (
    <div className="max-w-3xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light tracking-tight">Branding & Settings</h1>
        <p className="text-muted-foreground text-sm">Customize runtime branding elements for your tenant.</p>
      </div>

      {/* Theme Designer Card */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-light tracking-tight flex items-center gap-2">
            <Palette className="h-5 w-5 text-muted-foreground" />
            Dynamic Theme Designer
          </CardTitle>
          <CardDescription>
            Choose your brand colours to personalise the workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleApplyTheme} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Primary Color */}
              <div className="space-y-2">
                <Label htmlFor="primary" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Primary Color
                </Label>
                <div className="flex gap-2">
                  <div className="relative w-10 h-10 shrink-0 rounded-md overflow-hidden border border-input">
                    <input
                      id="primary"
                      type="color"
                      value={primary}
                      onChange={(e) => setPrimary(e.target.value)}
                      className="absolute inset-0 w-full h-full cursor-pointer border-0 p-0"
                    />
                  </div>
                  <Input
                    type="text"
                    value={primary}
                    onChange={(e) => setPrimary(e.target.value)}
                    className="flex-1 uppercase font-mono text-sm"
                    placeholder="#000000"
                  />
                </div>
              </div>

              {/* Secondary Color */}
              <div className="space-y-2">
                <Label htmlFor="secondary" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Secondary Color
                </Label>
                <div className="flex gap-2">
                  <div className="relative w-10 h-10 shrink-0 rounded-md overflow-hidden border border-input">
                    <input
                      id="secondary"
                      type="color"
                      value={secondary}
                      onChange={(e) => setSecondary(e.target.value)}
                      className="absolute inset-0 w-full h-full cursor-pointer border-0 p-0"
                    />
                  </div>
                  <Input
                    type="text"
                    value={secondary}
                    onChange={(e) => setSecondary(e.target.value)}
                    className="flex-1 uppercase font-mono text-sm"
                    placeholder="#000000"
                  />
                </div>
              </div>

              {/* Accent Color */}
              <div className="space-y-2">
                <Label htmlFor="accent" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Accent Color
                </Label>
                <div className="flex gap-2">
                  <div className="relative w-10 h-10 shrink-0 rounded-md overflow-hidden border border-input">
                    <input
                      id="accent"
                      type="color"
                      value={accent}
                      onChange={(e) => setAccent(e.target.value)}
                      className="absolute inset-0 w-full h-full cursor-pointer border-0 p-0"
                    />
                  </div>
                  <Input
                    type="text"
                    value={accent}
                    onChange={(e) => setAccent(e.target.value)}
                    className="flex-1 uppercase font-mono text-sm"
                    placeholder="#000000"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button type="submit" className="gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Apply Tenant Theme
              </Button>
              <Button type="button" variant="outline" onClick={handleResetTheme} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset to Defaults
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Theme Preview Card */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-light tracking-tight">Theme Preview</CardTitle>
          <CardDescription>
            The buttons and headers across the application dynamically adjust to your custom palette.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button className="gap-2" style={{ backgroundColor: primary, borderColor: primary }}>
              Primary Button
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              style={{ borderColor: secondary, color: secondary }}
            >
              Secondary Button
            </Button>
            <span className="text-sm font-medium" style={{ color: accent }}>
              Accent Text Link
            </span>
          </div>

          {/* Quick visual swatches */}
          <div className="flex gap-3 pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Primary</span>
              <div className="w-6 h-6 rounded-full border border-border" style={{ backgroundColor: primary }} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Secondary</span>
              <div className="w-6 h-6 rounded-full border border-border" style={{ backgroundColor: secondary }} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Accent</span>
              <div className="w-6 h-6 rounded-full border border-border" style={{ backgroundColor: accent }} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}