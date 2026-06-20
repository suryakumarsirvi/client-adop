import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router';
import { useTheme } from '@/context/ThemeProvider';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  GitBranch,
  Palette,
  Key,
  LogOut,
  Moon,
  Sun,
  ChevronRight,
  ChevronLeft,
  Bell,
  User,
  Settings,
  HelpCircle,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/dashboard/flows', icon: GitBranch, label: 'Flows Management' },
  { to: '/dashboard/settings', icon: Palette, label: 'Branding & Settings' },
  { to: '/dashboard/api', icon: Key, label: 'Generate API' },
];

const MainLayout = () => {
  const { mode, toggleMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const sidebarWidth = isSidebarOpen ? 'w-64' : 'w-16';
  const sidebarPadding = isSidebarOpen ? 'p-4' : 'p-2';

  return (
    <div className="h-screen overflow-hidden bg-background text-foreground flex">
      <aside
        className={cn(
          'hidden md:flex flex-col bg-card border-r border-border transition-all duration-300 ease-in-out h-full',
          sidebarWidth,
          sidebarPadding
        )}
      >
        <div className="flex items-center mt-2 justify-between mb-2 relative">
          {isSidebarOpen && (
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
              Navigation
            </span>
          )}

          <Button
            variant="ghost"
            size="icon"
            className={`px-4 h-7 cursor-pointer w-7 ${!isSidebarOpen ? 'mx-auto' : ''
              }`}
            onClick={toggleSidebar}
          >
            <i className={isSidebarOpen ? 'ri-menu-4-fill' : 'ri-menu-5-fill'} />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-1">
            {navItems.map(({ to, icon: Icon, label }) => {
              const isActive = location.pathname === to || (to !== '/dashboard' && location.pathname.startsWith(to));
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium',
                    isActive
                      ? 'bg-primary/10 text-primary shadow-sm'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    !isSidebarOpen && 'justify-center px-0'
                  )}
                  title={!isSidebarOpen ? label : ''}
                >
                  <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-primary' : 'text-muted-foreground')} />
                  {isSidebarOpen && <span className="flex-1 truncate">{label}</span>}
                  {isSidebarOpen && isActive && <ChevronRight className="h-3.5 w-3.5 text-primary shrink-0" />}
                </Link>
              );
            })}
          </div>
        </ScrollArea>

        {isSidebarOpen && (
          <div className="mt-auto border-t">
            <div className="flex items-center gap-3 px-3 py-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">john@webtour.dev</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 shrink-0 px-4 md:px-6 flex items-center justify-between sticky top-0 z-50 shadow-sm">
          <div className="flex items-center gap-3">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72">
                <div className="flex flex-col h-full">
                  <div className="h-16 flex items-center px-4 border-b">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }}>
                      <div className="w-8 h-8">
                        {mode === 'dark' ? (
                          <img className="h-full w-full" src="/logo/dap-logo-white.png" alt="WebTour" />
                        ) : (
                          <img className="h-full w-full" src="/logo/dap-logo-black.png" alt="WebTour" />
                        )}
                      </div>
                      <span className="font-heading text-lg font-light tracking-tight">WebTour</span>
                    </div>
                    <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsMobileMenuOpen(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <ScrollArea className="flex-1 px-2 py-4">
                    {navItems.map(({ to, icon: Icon, label }) => {
                      const isActive = location.pathname === to || (to !== '/dashboard' && location.pathname.startsWith(to));
                      return (
                        <Link
                          key={to}
                          to={to}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium',
                            isActive
                              ? 'bg-primary/10 text-primary shadow-sm'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          )}
                        >
                          <Icon className={cn('h-4 w-4', isActive ? 'text-primary' : 'text-muted-foreground')} />
                          <span>{label}</span>
                          {isActive && <ChevronRight className="h-3.5 w-3.5 text-primary ml-auto" />}
                        </Link>
                      );
                    })}
                  </ScrollArea>
                  <div className="p-4 border-t">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">john@webtour.dev</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <div className="hidden md:flex items-center gap-2.5 group cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-9 h-9">
                {mode === 'dark' ? (
                  <img className="h-full w-full" src="/logo/dap-logo-white.png" alt="WebTour" />
                ) : (
                  <img className="h-full w-full" src="/logo/dap-logo-black.png" alt="WebTour" />
                )}
              </div>
              <span className="font-heading text-xl font-light tracking-tight hover:opacity-80 transition">
                WebTour
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMode}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {mode === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/help')}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={() => navigate('/login')}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;