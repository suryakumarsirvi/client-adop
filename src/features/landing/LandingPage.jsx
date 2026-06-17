import { useNavigate } from 'react-router';
import { useTheme } from '@/context/ThemeProvider';
import { NavLink } from 'react-router';
import { Layers3 } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { mode, toggleMode } = useTheme();

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text transition-colors duration-300 antialiased font-sans selection:bg-brand-primary/20">

      <nav className="bg-brand-bg sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

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

          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-zinc-500 dark:text-zinc-400">
            <NavLink to="/features" className={({ isActive }) => isActive ? "text-brand-primary hover:text-brand-primary" : "text-black dark:text-white hover:text-brand-primary transition-colors duration-300"}>Features</NavLink>
            <NavLink to="/sdk" className={({ isActive }) => isActive ? "text-brand-primary hover:text-brand-primary" : "text-black dark:text-white hover:text-brand-primary transition-colors duration-300"}>SDK Integration</NavLink>
            <NavLink to="/analytics" className={({ isActive }) => isActive ? "text-brand-primary hover:text-brand-primary" : "text-black dark:text-white hover:text-brand-primary transition-colors duration-300"}>Analytics</NavLink>
            <NavLink to="/privacy" className={({ isActive }) => isActive ? "text-brand-primary hover:text-brand-primary" : "text-black dark:text-white hover:text-brand-primary transition-colors duration-300"}>Privacy</NavLink>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleMode}
              className="p-2 rounded-lg border border-brand-border hover:bg-brand-bg transition cursor-pointer text-zinc-500 dark:text-zinc-400"
              aria-label="Toggle Theme"
            >
              {mode === 'dark' ? (
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => navigate('/auth')}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-brand-primary text-white hover:bg-brand-secondary transition duration-300 cursor-pointer shadow-md shadow-brand-primary/10"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden max-w-7xl mx-auto px-6 pt-20 pb-20 md:pt-28 md:pb-24">

        <div className="absolute inset-x-0 top-0 flex justify-center pointer-events-none">
          <div className="h-[500px] w-[500px] rounded-full bg-brand-primary/10 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-5xl">

          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 mb-8">
            <div className="h-2 w-2 rounded-full bg-brand-primary" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-primary">
              Digital Adoption Platform
            </span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] text-slate-950 dark:text-white mb-8">
            Every user interaction,
            <span className="block text-slate-950 dark:bg-gradient-to-r dark:from-brand-primary dark:to-brand-secondary dark:bg-clip-text dark:text-transparent">
              guided, measured & adopted.
            </span>
          </h1>

          <p className="max-w-3xl text-lg md:text-xl leading-relaxed text-zinc-900 dark:text-zinc-400 mb-10">
            Drive feature adoption with interactive walkthroughs,
            onboarding flows, real-time analytics, and a visual builder
            designed for modern SaaS products.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/auth")}
              className="h-11 px-6 rounded-lg bg-brand-primary text-white font-medium hover:bg-brand-secondary transition-colors"
            >
              Get Started
            </button>

            <button
              className="h-11 px-6 rounded-lg border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors"
            >
              Book Demo
            </button>
          </div>

        </div>
      </section>

      <section id="features" className="max-w-7xl mx-auto px-6 py-16 border-t border-brand-border">

        <div className="mb-12">
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white inline-block relative pb-4">
            Everything you need for digital adoption
            <span className="absolute bottom-0 left-0 w-32 h-[3px] bg-brand-primary rounded-full"></span>
          </h2>
        </div>

        <div className="group bg-brand-card border border-brand-border rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/20 hover:shadow-lg hover:shadow-brand-primary/5">

          <div className="w-12 h-12 rounded-xl bg-brand-primary/8 border border-brand-primary/10 flex items-center justify-center mb-5">
            <Layers3 className="w-5 h-5 text-brand-primary" />
          </div>

          <h3 className="font-heading text-xl font-semibold text-slate-900 dark:text-white mb-3">
            Dynamic Guided Walkthroughs
          </h3>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Design interactive onboarding flows with configurable triggers,
            contextual guidance, and automated progression to improve feature adoption.
          </p>

        </div>
      </section>

      <footer className="border-t border-brand-border bg-brand-card/30 mt-16 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-zinc-500 dark:text-zinc-400">
          <div>
            &copy; {new Date().getFullYear()} dap-platform. All rights reserved.
          </div>
          <div className="flex gap-8">
            <a href="#privacy" className="hover:text-brand-primary transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-brand-primary transition">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
