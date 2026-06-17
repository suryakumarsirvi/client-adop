import { Outlet, Link, useNavigate } from 'react-router';
import { useTheme } from '@/context/ThemeProvider';

const MainLayout = () => {
  const { mode, toggleMode } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col transition-colors duration-300">
      <header className="h-16 px-6 bg-brand-card border-b border-brand-border flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10">
              {mode === 'dark' ? (
                <img className='h-full w-full' src="/logo/dap-logo-white.png" alt="" />
              ) : (
                <img className='h-full w-full' src="/logo/dap-logo-black.png" alt="" />
              )}
            </div>
            <span className="font-heading text-lg tracking-tight hover:opacity-95 transition">
              WebTour
            </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleMode}
            className="p-2 rounded-lg hover:bg-brand-bg border border-brand-border transition cursor-pointer text-sm font-medium"
            title="Toggle theme"
          >
            {mode === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>

          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 rounded-lg bg-brand-primary text-white hover:opacity-90 transition cursor-pointer text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex flex-1">
        {/* Sidebar Nav */}
        <aside className="w-64 bg-brand-card border-r border-brand-border p-4 flex flex-col gap-2">
          <div className="text-xs font-semibold text-zinc-400 uppercase px-3 mb-2">Navigation</div>
          <Link
            to="/dashboard"
            className="px-3 py-2 rounded-lg hover:bg-brand-bg transition text-sm font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/dashboard/flows"
            className="px-3 py-2 rounded-lg hover:bg-brand-bg transition text-sm font-medium"
          >
            Flows Management
          </Link>
          <Link
            to="/dashboard/settings"
            className="px-3 py-2 rounded-lg hover:bg-brand-bg transition text-sm font-medium"
          >
            Branding & Settings
          </Link>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
