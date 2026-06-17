import { useState } from 'react';
import { useNavigate } from 'react-router';
import { usePermission } from '@/context/PermissionProvider';
import { saveLocalTenant } from '@/hooks/useTenant';
import { toast } from 'sonner';
import {
  User,
  Briefcase,
  Mail,
  Lock,
  ShieldAlert,
  Rocket,
  TrendingUp, 
  Crown,
  ArrowLeft,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

// Plans catalog based on the Sequelize Schema parameters
const PLANS_CATALOG = [
  {
    code: 'starter',
    name: 'Starter Tier',
    price: '$0',
    description: 'Perfect for small projects & trials.',
    icon: Rocket,
    seatsLimit: 5,
    mauLimit: 10000,
    flowLimit: 3,
    color: 'from-blue-500 to-cyan-500',
    features: { analytics_dashboard: false, custom_css: false }
  },
  {
    code: 'growth',
    name: 'Growth Tier',
    price: '$49/mo',
    description: 'Ideal for growing products.',
    icon: TrendingUp,
    seatsLimit: 20,
    mauLimit: 50000,
    flowLimit: 10,
    color: 'from-brand-primary to-brand-secondary',
    features: { analytics_dashboard: true, custom_css: false }
  },
  {
    code: 'enterprise_custom_v1',
    name: 'Enterprise Custom Tier',
    price: 'Custom',
    description: 'Scale support for large systems.',
    icon: Crown,
    seatsLimit: 100,
    mauLimit: 500000,
    flowLimit: 99,
    color: 'from-purple-500 to-indigo-500',
    features: { analytics_dashboard: true, custom_css: true }
  }
];

import { useMutation } from '@tanstack/react-query';
import { createTenant } from '@/api/tenant.api';

export default function AuthPage() {
  const navigate = useNavigate();
  const { setPermissions } = usePermission();

  const [isRegister, setIsRegister] = useState(false);
  const [step, setStep] = useState(1);

  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedPlanCode, setSelectedPlanCode] = useState('growth');

  const handleProceedToPlans = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !companyName.trim() || !email.trim() || !password || !confirmPassword) {
      toast.error('Please fill in all account and organisation details.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }
    setStep(2);
  };

  const registerMutation = useMutation({
    mutationFn: createTenant,
    onSuccess: (data) => {
      console.log('API Response success:', data);
      const selectedPlan = PLANS_CATALOG.find(p => p.code === selectedPlanCode);
      const tenantSlug = data.tenant?.slug || data.slug;

      if (tenantSlug) {
        saveLocalTenant(tenantSlug, {
          companyName,
          fullName,
          email,
          planCode: selectedPlanCode,
          planDetails: selectedPlan,
          tenantId: data.tenant?.id,
          userId: data.user?.id,
        });

        toast.success(`Tenant ${companyName} created successfully! Redirecting...`);
        setTimeout(() => {
          window.location.href = `http://${tenantSlug}.localhost:5173/dashboard`;
        }, 1000);
      } else {
        toast.error('Tenant registered, but slug was missing in response.');
      }
    },
    onError: (error) => {
      console.error('API Error details:', error);
      toast.error(`Backend API Error: ${error.message}`);

      // Offline fallback
      const selectedPlan = PLANS_CATALOG.find(p => p.code === selectedPlanCode);
      const fallbackSlug = companyName
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

      saveLocalTenant(fallbackSlug, {
        companyName,
        fullName,
        email,
        planCode: selectedPlanCode,
        planDetails: selectedPlan,
        simulated: true,
      });

      toast.warning('Offline Fallback: Redirecting to simulated workspace...');
      setTimeout(() => {
        window.location.href = `http://${fallbackSlug}.localhost:5173/dashboard`;
      }, 2000);
    }
  });

  const isLoading = registerMutation.isPending;

  const handleAuthSubmit = async (e) => {
    e.preventDefault();

    if (isRegister) {
      registerMutation.mutate({
        fullName,
        companyName,
        email,
        password,
        planCode: selectedPlanCode
      });
    } else {
      if (!email || !password) {
        toast.error('Please enter email and password.');
        return;
      }

      setPermissions(['*']);
      toast.success('Logged in successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 800);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-bg text-brand-text p-4 transition-colors duration-300 antialiased font-sans">
      <div className={`w-full ${isRegister && step === 2 ? 'max-w-4xl' : 'max-w-lg'} bg-brand-card border border-brand-border rounded-xl p-8 shadow-xl transition-all duration-300`}>

        {isRegister && (
          <div className="flex items-center justify-center gap-4 mb-6 text-xs font-semibold text-zinc-400">
            <span className={`px-2.5 py-1 rounded-full ${step === 1 ? 'bg-brand-primary text-white' : 'bg-brand-primary/10 text-brand-primary'}`}>
              1. Account Info
            </span>
            <div className="h-[1px] w-8 bg-brand-border" />
            <span className={`px-2.5 py-1 rounded-full ${step === 2 ? 'bg-brand-primary text-white' : 'bg-brand-border text-zinc-400'}`}>
              2. Plan Selection
            </span>
          </div>
        )}

        <div className="text-center mb-6">
          <h2 className="font-heading text-3xl font-semibold tracking-tight leading-none">
            {isRegister
              ? (step === 1 ? 'Create an Account' : 'Choose Your Subscription Plan')
              : 'Welcome Back'}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2">
            {isRegister
              ? (step === 1 ? 'Provide organisation credentials to set up a tenant.' : 'Choose the configuration matches your workflow size.')
              : 'Enter credentials to access your workspace.'}
          </p>
        </div>

        {(!isRegister || step === 1) && (
          <form onSubmit={isRegister ? handleProceedToPlans : handleAuthSubmit} className="flex flex-col gap-4">

            {isRegister && (
              <>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Enter your name"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-brand-border bg-brand-bg text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary/30 text-sm font-medium transition"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Company / Organisation Name</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Your company's name"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-brand-border bg-brand-bg text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary/30 text-sm font-medium transition"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-brand-border bg-brand-bg text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary/30 text-sm font-medium transition"
                />
              </div>
            </div>
            {!isRegister && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-brand-border bg-brand-bg text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary/30 text-sm font-medium transition"
                  />
                </div>
              </div>)}


            {isRegister && (
              <div className='w-full flex gap-4'>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-brand-border bg-brand-bg text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary/30 text-sm font-medium transition"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Confirm Password</label>
                  <div className="relative">
                    <ShieldAlert className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-brand-border bg-brand-bg text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary/30 text-sm font-medium transition"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 mt-2 flex items-center justify-center gap-2 rounded-lg bg-brand-primary text-white font-semibold hover:bg-brand-secondary transition duration-300 cursor-pointer text-sm shadow-md shadow-brand-primary/10"
            >
              <span>{isRegister ? 'Continue to Plans' : 'Sign In'}</span>
              {isRegister ? <ArrowRight className="w-4 h-4" /> : null}
            </button>
          </form>
        )}

        {isRegister && step === 2 && (
          <form onSubmit={handleAuthSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PLANS_CATALOG.map((plan) => {
                const PlanIcon = plan.icon;
                const isSelected = selectedPlanCode === plan.code;

                return (
                  <div
                    key={plan.code}
                    onClick={() => setSelectedPlanCode(plan.code)}
                    className={`relative flex flex-col justify-between p-6 rounded-xl border-2 bg-brand-card cursor-pointer transition-all duration-300 ${isSelected
                      ? 'border-brand-primary shadow-lg shadow-brand-primary/5 -translate-y-1'
                      : 'border-brand-border hover:border-zinc-300 dark:hover:border-zinc-700'
                      }`}
                  >
                    {/* Selected Badge */}
                    {isSelected && (
                      <div className="absolute -top-3 right-4 bg-brand-primary text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                        <CheckCircle2 className="w-3 h-3" />
                        Selected
                      </div>
                    )}

                    <div>
                      {/* Icon & Title */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-lg bg-linear-to-tr ${plan.color} text-white flex items-center justify-center shadow`}>
                          <PlanIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-heading font-extrabold text-sm">{plan.name}</h3>
                          <span className="text-xs text-zinc-400">{plan.code === 'enterprise_custom_v1' ? 'Enterprise' : 'Subscription'}</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mb-4">
                        <span className="text-3xl font-black">{plan.price}</span>
                        {plan.price !== 'Custom' && <span className="text-xs text-zinc-400"> / month</span>}
                      </div>

                      <p className="text-xs text-zinc-500 mb-6 leading-relaxed">
                        {plan.description}
                      </p>

                      {/* Limits Specifications */}
                      <div className="flex flex-col gap-2.5 text-xs border-t border-brand-border pt-4 text-zinc-600 dark:text-zinc-300">
                        <div className="flex justify-between">
                          <span>Team Seats</span>
                          <span className="font-bold">{plan.seatsLimit} Seats</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Active MAU Limit</span>
                          <span className="font-bold">{plan.mauLimit.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Max Guides/Flows</span>
                          <span className="font-bold">{plan.flowLimit} Active</span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span>Analytics Portal</span>
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${plan.features.analytics_dashboard ? 'bg-emerald-500/10 text-emerald-600' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500'}`}>
                            {plan.features.analytics_dashboard ? 'Included' : 'None'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Back and Confirm Controls */}
            <div className="flex gap-4 border-t border-brand-border pt-6 mt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                disabled={isLoading}
                className="px-5 py-3 rounded-lg border border-brand-border hover:bg-brand-bg text-sm font-semibold text-zinc-700 dark:text-zinc-300 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-3 rounded-lg bg-brand-primary text-white font-semibold hover:bg-brand-secondary transition duration-300 cursor-pointer text-sm shadow-md shadow-brand-primary/10 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-4.5 h-4.5" />
                    <span>Complete Signup & Create Workspace</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

        {/* Bottom Navigation Toggle */}
        {(!isRegister || step === 1) && (
          <div className="mt-6 text-center text-xs text-zinc-500">
            <span>{isRegister ? 'Already have an account?' : 'Don\'t have an account?'} </span>
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-brand-primary font-semibold hover:underline cursor-pointer bg-transparent border-0 p-0"
            >
              {isRegister ? 'Sign In' : 'Create Account'}
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
