import { useNavigate } from 'react-router';
import { useTheme } from '@/context/ThemeProvider';
import { NavLink } from 'react-router';
import { Layers3, Zap, BarChart3, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function LandingPage() {
  const navigate = useNavigate();
  const { mode, toggleMode } = useTheme();

  const features = [
    {
      icon: Layers3,
      title: 'Dynamic Walkthroughs',
      description: 'Design interactive onboarding flows with configurable triggers and contextual guidance to boost feature adoption.',
    },
    {
      icon: Zap,
      title: 'Real-time Analytics',
      description: 'Track user engagement, drop-off points, and conversion metrics to optimize your adoption strategy.',
    },
    {
      icon: BarChart3,
      title: 'Visual Builder',
      description: 'Build and deploy tours without code using our intuitive drag-and-drop editor tailored for product teams.',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'SOC2 compliant, with SSO, RBAC, and data encryption to keep your user data safe and secure.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground antialiased font-sans selection:bg-primary/20">
      <Navbar mode={mode} toggleMode={toggleMode} />

      <section className="relative overflow-hidden h-screen py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="absolute inset-0 -z-10 flex justify-center">
            <div className="h-[600px] w-[600px] rounded-full bg-primary/20 blur-[150px]" />
          </div>
          <div className="max-w-5xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-xs font-medium tracking-wider uppercase border-primary/20 bg-primary/5">
              Digital Adoption Platform
            </Badge>
            <h1 className="text-5xl md:text-7xl leading-[1.1] tracking-tight">
              Every user interaction,
              <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                guided, measured & adopted.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
              Drive feature adoption with interactive walkthroughs, onboarding flows,
              real-time analytics, and a visual builder designed for modern SaaS.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button className="cursor-pointer" size="lg" onClick={() => navigate('/auth')}>
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button className="cursor-pointer" size="lg" variant="outline" >
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
          <div className="mb-14 text-center">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">
              Everything you need for digital adoption
            </h2>
            <p className="mt-2 text-muted-foreground text-lg font-light">
              Powerful tools to guide users and measure success.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="group border bg-card/50 backdrop-blur-sm transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-normal">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer mode={mode} />
    </div>
  );
}