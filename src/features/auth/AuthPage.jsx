import { useState } from 'react';
import { useNavigate } from 'react-router';
import { usePermission } from '@/context/PermissionProvider';
import { saveLocalTenant } from '@/hooks/useTenant';
import { toast } from 'sonner';
import {
  Rocket,
  TrendingUp,
  Crown,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { createTenant } from '@/api/tenant.api';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
    features: { analytics_dashboard: false, custom_css: false },
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
    features: { analytics_dashboard: true, custom_css: false },
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
    features: { analytics_dashboard: true, custom_css: true },
  },
];

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
      const selectedPlan = PLANS_CATALOG.find((p) => p.code === selectedPlanCode);
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
      const selectedPlan = PLANS_CATALOG.find((p) => p.code === selectedPlanCode);
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
    },
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
        planCode: selectedPlanCode,
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
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {step !== 2 && <div className="flex-1 bg-muted/20 p-8 md:p-12 flex flex-col justify-between min-h-[300px] md:min-h-screen order-2 md:order-1">
        <div>
          <h1 className="text-3xl md:text-6xl font-light tracking-tight text-foreground">
            {isRegister ? (step === 1 ? "Let's get started." : 'Almost there.') : 'Welcome back.'}
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            {isRegister ? 'Create your workspace in minutes.' : 'Sign in to access your workspace.'}
          </p>
        </div>

        <div className="space-y-6 flex justify-between">
          <div>
            <a href="mailto:hello@webtour.dev" className="text-muted-foreground hover:text-primary transition-colors text-lg">
              hello@webtour.com
            </a>
            <div className="flex gap-4 mt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <i className="h-10 w-10 ri-facebook-circle-fill"></i>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <i className="h-10 w-10 ri-instagram-fill"></i>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <i className="h-10 w-10 ri-behance-fill"></i>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <i className="h-10 w-10 ri-linkedin-box-fill"></i>
              </a>
            </div>
          </div>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Mumbai, India</p>
            <p>+91 99999 12345</p>
          </div>
        </div>
      </div>}

      <div className="flex-1 p-8 md:p-12 flex flex-col justify-center order-1 md:order-2">
        {/* Login Form */}
        {!isRegister && (
          <div className="max-w-sm w-full mx-auto">
            <h2 className="text-4xl font-light tracking-tight mb-6">Sign in</h2>
            <form onSubmit={handleAuthSubmit} className="space-y-5">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-0 border-b-2 rounded-none p-2 h-auto shadow-none focus-visible:ring-0 focus-visible:border-primary transition-colors"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="loginPassword" className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  Password
                </Label>
                <Input
                  id="loginPassword"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-0 border-b-2 rounded-none p-2 h-auto shadow-none focus-visible:ring-0 focus-visible:border-primary transition-colors"
                  required
                />
              </div>
              <div className="pt-4 flex items-center justify-between">
                <Button
                  type="submit"
                  variant="ghost"
                  className="p-0 cursor-pointer h-auto text-primary font-medium text-base gap-2 hover:bg-transparent hover:underline"
                >
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <button
                  type="button"
                  onClick={() => setIsRegister(true)}
                  className="text-sm cursor-pointer text-muted-foreground hover:text-primary transition-colors"
                >
                  Create account
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Register Step 1 */}
        {isRegister && step === 1 && (
          <div className="max-w-sm w-full mx-auto">
            <h2 className="text-4xl font-light tracking-tight mb-6">Create your workspace</h2>
            <form onSubmit={handleProceedToPlans} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="fullName" className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="border-0 border-b-2 rounded-none p-2 h-auto shadow-none focus-visible:ring-0 focus-visible:border-primary transition-colors"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="companyName" className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  Company / Organisation
                </Label>
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Acme Inc."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="border-0 border-b-2 rounded-none p-2 h-auto shadow-none focus-visible:ring-0 focus-visible:border-primary transition-colors"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="regEmail" className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  Email Address
                </Label>
                <Input
                  id="regEmail"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-0 border-b-2 rounded-none p-2 h-auto shadow-none focus-visible:ring-0 focus-visible:border-primary transition-colors"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-0 border-b-2 rounded-none p-2 h-auto shadow-none focus-visible:ring-0 focus-visible:border-primary transition-colors"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirmPassword" className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border-0 border-b-2 rounded-none p-2 h-auto shadow-none focus-visible:ring-0 focus-visible:border-primary transition-colors"
                    required
                  />
                </div>
              </div>
              <div className="pt-4 flex items-center justify-between">
                <Button
                  type="submit"
                  variant="ghost"
                  className="p-0 h-auto cursor-pointer text-primary font-medium text-base gap-2 hover:bg-transparent hover:underline"
                >
                  Continue to Plans
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <button
                  type="button"
                  onClick={() => setIsRegister(false)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Sign in instead
                </button>
              </div>
            </form>
          </div>
        )}
        {/* Register Step 2 */}
        {isRegister && step === 2 && (
          <div className="w-full h-full flex flex-col">
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight">Choose your plan</h2>
              <p className="text-muted-foreground text-lg">Select the plan that fits your needs. You can always change later.</p>
            </div>
            <form onSubmit={handleAuthSubmit} className="flex-1 flex flex-col">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {PLANS_CATALOG.map((plan) => {
                  const PlanIcon = plan.icon;
                  const isSelected = selectedPlanCode === plan.code;
                  return (
                    <div
                      key={plan.code}
                      onClick={() => setSelectedPlanCode(plan.code)}
                      className={cn(
                        'relative cursor-pointer p-6 transition-all duration-200 flex flex-col',
                        'border-2 rounded-xl hover:border-primary/50',
                        isSelected ? 'border-primary bg-primary/5 shadow-sm' : 'border-border'
                      )}
                    >
                      {isSelected && (
                        <Badge className="absolute -top-2 right-4 bg-primary text-primary-foreground text-xs uppercase tracking-wider flex items-center gap-1 shadow-sm">
                          <CheckCircle2 className="h-3 w-3" />
                          Selected
                        </Badge>
                      )}
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={cn(
                            'w-12 h-12 rounded-xl bg-gradient-to-tr text-white flex items-center justify-center shadow-md',
                            plan.color
                          )}
                        >
                          <PlanIcon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{plan.name}</h3>
                          <span className="text-xs text-muted-foreground">
                            {plan.code === 'enterprise_custom_v1' ? 'Enterprise' : 'Subscription'}
                          </span>
                        </div>
                      </div>
                      <div className="mb-2">
                        <span className="text-3xl font-bold">{plan.price}</span>
                        {plan.price !== 'Custom' && <span className="text-sm text-muted-foreground"> / month</span>}
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{plan.description}</p>
                      <div className="mt-auto space-y-2 text-sm pt-3 border-t border-border/50">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Team Seats</span>
                          <span className="font-medium">{plan.seatsLimit} Seats</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">MAU Limit</span>
                          <span className="font-medium">{plan.mauLimit.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Max Guides/Flows</span>
                          <span className="font-medium">{plan.flowLimit} Active</span>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                          <span className="text-muted-foreground">Analytics Portal</span>
                          <Badge
                            variant={plan.features.analytics_dashboard ? 'default' : 'outline'}
                            className="text-[10px]"
                          >
                            {plan.features.analytics_dashboard ? 'Included' : 'None'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(1)}
                  disabled={isLoading}
                  className="p-0 h-auto text-muted-foreground font-medium text-base gap-2 hover:bg-transparent hover:text-primary"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  variant="ghost"
                  className="p-0 h-auto text-primary font-medium text-base gap-2 hover:bg-transparent hover:underline"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Creating...
                    </div>
                  ) : (
                    <>
                      Complete Signup
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}