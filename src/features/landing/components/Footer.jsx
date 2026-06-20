import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

const Footer = ({ mode }) => {
    const bgColor = mode === 'dark' ? 'bg-zinc-900' : 'bg-white';
    const borderColor = mode === 'dark' ? 'border-zinc-800' : 'border-gray-200';
    const headingColor = mode === 'dark' ? 'text-white' : 'text-gray-900';
    const mutedColor = mode === 'dark' ? 'text-zinc-400' : 'text-gray-500';
    const inputBg = mode === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300';

    return (
        <footer className={`mt-16 rounded-t-[4rem] ${bgColor} border-t ${borderColor} transition-colors duration-300 shadow-lg`}>
            <div className="container px-6 md:px-12 lg:px-24 py-12 md:py-16">
                <div className={`flex flex-col lg:flex-row items-center justify-between gap-8 p-8 md:p-12 rounded-2xl transition-colors duration-300`}>
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
                            Subscribe to our newsletter
                        </h2>
                        <p className="text-lg font-light mt-2 max-w-md">
                            Be the first to receive updates, tips, and more.
                        </p>
                    </div>

                    <div className="w-full lg:w-auto">
                        <form
                            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <Input
                                type="email"
                                placeholder="Enter your email..."
                                className={`h-12 w-full sm:w-72 md:w-80 ${inputBg} text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:ring-2 focus:ring-white/50`}
                            />
                            <Button type="submit" size="lg" className="h-12 px-6 font-semibold hover:bg-gray-100 transition-all duration-200">
                                <Mail className="h-4 w-4 mr-2" />
                                Subscribe
                            </Button>
                        </form>
                        <p className="text-xs mt-3 text-center sm:text-left">
                            By subscribing you agree to our Privacy Policy
                        </p>
                    </div>
                </div>

                <div className={`border-t ${borderColor} my-10`}></div>

                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-10 h-10">
                                {mode === 'dark' ? (
                                    <img className="h-full w-full" src="/logo/dap-logo-white.png" alt="WebTour" />
                                ) : (
                                    <img className="h-full w-full" src="/logo/dap-logo-black.png" alt="WebTour" />
                                )}
                            </div>
                            <span className={`text-2xl font-light tracking-tight ${headingColor}`}>
                                WebTour
                            </span>
                        </div>
                        <p className={`text-sm ${mutedColor} max-w-xs leading-relaxed`}>
                            Your go-to platform for digital adoption and user engagement insights.
                        </p>
                        <div className="flex gap-4 mt-4">
                            <a href="#" className={`${mutedColor} hover:text-primary transition-colors`}>
                                <i className="h-12 w-12 ri-twitter-x-line"></i>
                            </a>
                            <a href="#" className={`${mutedColor} hover:text-primary transition-colors`}>
                                <i className="h-12 w-12 ri-linkedin-box-fill"></i>
                            </a>
                            <a href="#" className={`${mutedColor} hover:text-primary transition-colors`}>
                                <i className="h-12 w-12 ri-github-fill"></i>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className={`text-sm font-medium mb-3 ${headingColor}`}>Features</h3>
                        <ul className={`space-y-2 text-sm ${mutedColor}`}>
                            <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Docs</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className={`text-sm font-medium mb-3 ${headingColor}`}>Support</h3>
                        <ul className={`space-y-2 text-sm ${mutedColor}`}>
                            <li><a href="#" className="hover:text-primary transition-colors">Account</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className={`text-sm font-medium mb-3 ${headingColor}`}>Legal</h3>
                        <ul className={`space-y-2 text-sm ${mutedColor}`}>
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Cookies</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-6 text-center">
                    <h1 className={`text-7xl sm:text-8xl md:text-[15rem] tracking-tight font-semibold uppercase ${headingColor} opacity-90`}>
                        Webtour
                    </h1>
                </div>

                <div className="border-t pt-6 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} WebTour Technologies Ltd. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;