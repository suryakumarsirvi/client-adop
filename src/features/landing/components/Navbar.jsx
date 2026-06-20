import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import React from 'react'
import { NavLink, useNavigate } from 'react-router'

const Navbar = ({mode,toggleMode}) => {
    const navigate = useNavigate();
    
    return (
        <nav className="sticky top-2 z-50 md:mx-24 mx-6 backdrop-blur rounded-full px-6 supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="w-9 h-9">
                        {mode === 'dark' ? (
                            <img className="h-full w-full" src="/logo/dap-logo-white.png" alt="WebTour" />
                        ) : (
                            <img className="h-full w-full" src="/logo/dap-logo-black.png" alt="WebTour" />
                        )}
                    </div>
                    <span className="text-xl font-light tracking-tight">WebTour</span>
                </div>

                <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <NavLink
                        to="/features"
                        className={({ isActive }) =>
                            `transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'}`
                        }
                    >
                        Features
                    </NavLink>
                    <NavLink
                        to="/sdk"
                        className={({ isActive }) =>
                            `transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'}`
                        }
                    >
                        SDK Integration
                    </NavLink>
                    <NavLink
                        to="/analytics"
                        className={({ isActive }) =>
                            `transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'}`
                        }
                    >
                        Analytics
                    </NavLink>
                    <NavLink
                        to="/privacy"
                        className={({ isActive }) =>
                            `transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'}`
                        }
                    >
                        Privacy
                    </NavLink>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleMode}
                        className="rounded-full"
                    >
                        {mode === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>
                    <Button onClick={() => navigate('/auth')}>
                        Get Started
                    </Button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
