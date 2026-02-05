import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useAssets } from '../hooks/useAssets';
import { useTransactions } from '../hooks/useTransactions';
import DashboardView from './dashboard/DashboardView';
import AssetsView from './dashboard/AssetsView';
import TransactionsView from './dashboard/TransactionsView';
import toast from 'react-hot-toast';
import { cn } from '../utils/cn';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const { data: assets = [], isLoading: assetsLoading } = useAssets();
    const { data: transactions = [], isLoading: transactionsLoading } = useTransactions();
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
    };

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'assets', label: 'Assets' },
        { id: 'transactions', label: 'Transactions' },
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
                    {tabs.map(tab => (
                        <motion.button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setSidebarOpen(false);
                            }}
                            whileHover={{ x: 4 }}
                            className={cn(
                                "w-full text-left px-4 py-2 rounded-lg transition-colors duration-200",
                                activeTab === tab.id
                                    ? "bg-primary/20 text-secondary border border-secondary/30"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {tab.label}
                        </motion.button>
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
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors md:hidden"
                        >
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                        <h2 className="text-xl font-semibold flex-1 md:flex-none ml-2 md:ml-0">
                            {tabs.find(t => t.id === activeTab)?.label}
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className="text-sm text-gray-400 text-right">
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

                {/* Content Area */}
                <div className="p-6 md:p-12">
                    {activeTab === 'overview' && (
                        <DashboardView
                            assets={assets}
                            transactions={transactions}
                            assetsLoading={assetsLoading}
                            transactionsLoading={transactionsLoading}
                        />
                    )}
                    {activeTab === 'assets' && (
                        <AssetsView assets={assets} isLoading={assetsLoading} />
                    )}
                    {activeTab === 'transactions' && (
                        <TransactionsView transactions={transactions} isLoading={transactionsLoading} assets={assets} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
