import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Menu, X, LayoutDashboard, Wallet, ArrowLeftRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { cn } from '../utils/cn';

const DashboardLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/', { replace: true });
    };

    const navItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
        { id: 'assets', label: 'Assets', icon: Wallet, path: '/dashboard/assets' },
        { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight, path: '/dashboard/transactions' },
    ];

    return (
        <div className="min-h-screen bg-background text-white overflow-hidden">
            {/* Background ambient glow */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px]" />
            </div>

            {/* Sidebar */}
            <div className={cn(
                "fixed left-0 top-0 h-screen w-64 bg-surface/50 backdrop-blur-md border-r border-white/10 z-40 transition-transform duration-300",
                !sidebarOpen && "-translate-x-full"
            )}>
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-2xl font-bold text-gradient">MARC</h1>
                </div>
                <nav className="p-6 space-y-3">
                    {navItems.map(item => (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            end={item.path === '/dashboard'}
                            onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200",
                                isActive
                                    ? "bg-primary/20 text-secondary border border-secondary/30"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {({ isActive }) => (
                                <motion.div
                                    className="flex items-center gap-3 w-full"
                                    whileHover={{ x: 4 }}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </motion.div>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className={cn(
                "relative z-10 transition-all duration-300",
                sidebarOpen ? "md:ml-64" : "ml-0"
            )}>
                {/* Top Bar */}
                <header className="sticky top-0 z-30 backdrop-blur-md bg-surface/30 border-b border-white/10 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                        >
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                        <div className="flex items-center gap-4">
                            <div className="text-sm text-gray-400 text-right hidden sm:block">
                                <p className="font-medium text-white">{user?.name || 'User'}</p>
                                <p className="text-xs">{user?.email}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-gray-400 hover:text-red-400"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content Area - This is where nested routes render */}
                <div className="p-6 md:p-12">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
