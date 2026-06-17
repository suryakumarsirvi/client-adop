import { useState } from 'react';
import { useTheme } from '@/context/ThemeProvider';
import { toast } from 'sonner';

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
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Branding & Settings</h1>
        <p className="text-zinc-500 text-sm mt-1">Customize runtime branding elements for your tenant.</p>
      </div>

      <div className="bg-brand-card p-6 rounded-xl border border-brand-border shadow-sm">
        <form onSubmit={handleApplyTheme} className="flex flex-col gap-5">
          <h3 className="font-bold text-lg">Dynamic Theme Designer</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase">Primary Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={primary}
                  onChange={(e) => setPrimary(e.target.value)}
                  className="w-10 h-10 border border-brand-border rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={primary}
                  onChange={(e) => setPrimary(e.target.value)}
                  className="flex-1 px-3 border border-brand-border bg-brand-bg rounded text-sm uppercase"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase">Secondary Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={secondary}
                  onChange={(e) => setSecondary(e.target.value)}
                  className="w-10 h-10 border border-brand-border rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={secondary}
                  onChange={(e) => setSecondary(e.target.value)}
                  className="flex-1 px-3 border border-brand-border bg-brand-bg rounded text-sm uppercase"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase">Accent Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={accent}
                  onChange={(e) => setAccent(e.target.value)}
                  className="w-10 h-10 border border-brand-border rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={accent}
                  onChange={(e) => setAccent(e.target.value)}
                  className="flex-1 px-3 border border-brand-border bg-brand-bg rounded text-sm uppercase"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-brand-primary text-white text-sm font-semibold rounded-lg shadow-sm hover:opacity-90 transition cursor-pointer"
            >
              Apply Tenant Theme
            </button>
            <button
              type="button"
              onClick={handleResetTheme}
              className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-semibold rounded-lg shadow-sm hover:opacity-90 transition cursor-pointer border border-brand-border"
            >
              Reset to Defaults
            </button>
          </div>
        </form>
      </div>

      <div className="bg-brand-card p-6 rounded-xl border border-brand-border shadow-sm flex flex-col gap-3">
        <h3 className="font-bold">Theme Preview</h3>
        <p className="text-sm text-zinc-500">
          The buttons and headers across the application dynamically adjust to your customized palette.
        </p>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-brand-primary text-white text-sm font-semibold rounded-lg">
            Primary Button
          </button>
          <button className="px-4 py-2 bg-brand-secondary text-white text-sm font-semibold rounded-lg">
            Secondary Button
          </button>
          <span className="text-brand-accent font-bold self-center">Accent Text Link</span>
        </div>
      </div>
    </div>
  );
}
