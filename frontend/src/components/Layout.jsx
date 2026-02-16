import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-primary-500/30">

            <Navbar />
            <main className="flex-1 p-4 md:p-8 overflow-y-auto mb-16 md:mb-0">
                <div className="max-w-5xl mx-auto w-full animate-slide-up">
                    <Outlet />
                </div>
            </main>

        </div>
    );
};

export default Layout;
