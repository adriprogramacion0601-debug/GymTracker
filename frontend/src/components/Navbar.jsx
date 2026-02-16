import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, LayoutDashboard, LogOut, User } from 'lucide-react';
import clsx from 'clsx';

const Navbar = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Routines', path: '/routines', icon: Dumbbell },
        { name: 'Profile', path: '/profile', icon: User },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed bottom-0 left-0 right-0 md:static md:w-64 md:h-screen bg-white/80 md:bg-white dark:bg-zinc-900 border-t md:border-t-0 md:border-r border-zinc-200 dark:border-zinc-800 backdrop-blur-lg md:backdrop-blur-none z-50 transition-all duration-300">
            <div className="flex md:flex-col items-center justify-around md:justify-start h-16 md:h-full md:p-6">
                <div className="hidden md:flex items-center gap-3 mb-10 w-full px-2">
                    <div className="bg-primary-600 p-2 rounded-xl">
                        <Dumbbell className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600">
                        GymTracker
                    </span>
                </div>

                <div className="flex md:flex-col w-full gap-2 md:gap-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={clsx(
                                "flex flex-col md:flex-row items-center md:gap-3 p-2 md:px-4 md:py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                isActive(item.path)
                                    ? "text-primary-600 md:bg-primary-50 dark:md:bg-primary-900/10 font-medium"
                                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                            )}
                        >
                            <item.icon className={clsx(
                                "w-6 h-6 md:w-5 md:h-5 transition-transform",
                                isActive(item.path) ? "scale-110" : "group-hover:scale-110"
                            )} />
                            <span className="text-xs md:text-sm mt-1 md:mt-0">{item.name}</span>
                            {isActive(item.path) && (
                                <div className="absolute inset-0 bg-primary-600/5 dark:bg-primary-400/5 rounded-xl md:hidden" />
                            )}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex mt-auto w-full">
                    <button
                        className="flex items-center gap-3 p-4 w-full rounded-xl text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors duration-200"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
