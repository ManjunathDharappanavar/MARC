import { motion } from 'framer-motion';
import { Wallet, TrendingUp, CreditCard, Activity, ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';
import { cn } from '../../utils/cn';

const Card = ({ children, className, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        whileHover={{ y: -5, boxShadow: "0 10px 40px -10px rgba(112,0,255,0.15)" }}
        className={cn("glass-panel p-6 flex flex-col", className)}
    >
        {children}
    </motion.div>
);

const DashboardView = ({ assets, transactions, assetsLoading, transactionsLoading }) => {
    const recentTransactions = transactions.slice(0, 5);
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + (t.amount || 0), 0);
    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + (t.amount || 0), 0);
    const totalNetWorth = assets.reduce((sum, asset) => sum + (asset.value || 0), 0);

    const topAsset = assets.length > 0
        ? assets.reduce((max, asset) => (asset.value > max.value ? asset : max), assets[0])
        : null;

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2">
                    Welcome Back
                </h1>
                <p className="text-gray-500">Here's your financial overview</p>
            </motion.div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-max">
                {/* Net Worth (Large Card) */}
                <Card className="md:col-span-4 justify-between h-64 relative overflow-hidden" delay={0.1}>
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/10 pointer-events-none" />
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-8">
                            <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                                <Wallet className="w-6 h-6 text-secondary" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-gray-400 text-sm font-medium mb-1">Total Net Worth</h3>
                            <div className="text-4xl font-bold tracking-tight text-white mb-4">
                                ${totalNetWorth.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                            <div className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 w-fit px-2 py-1 rounded-full border border-green-500/20">
                                <ArrowUpRight className="w-3 h-3" />
                                <span>+{assets.length} assets</span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Asset Breakdown */}
                <Card className="md:col-span-8 h-96 relative overflow-hidden" delay={0.2}>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-10 pointer-events-none" />
                    <div className="flex justify-between items-center mb-6 z-20 relative">
                        <div>
                            <h3 className="text-lg font-semibold mb-1">Top Assets</h3>
                            <p className="text-xs text-gray-500">{assets.length} total assets</p>
                        </div>
                    </div>
                    <div className="space-y-3 z-20 relative">
                        {assets.slice(0, 5).map((asset, i) => {
                            const percentage = totalNetWorth > 0 ? (asset.value / totalNetWorth) * 100 : 0;
                            return (
                                <motion.div
                                    key={asset._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-medium">{asset.name}</span>
                                            <span className="text-xs text-gray-400">${asset.value.toFixed(2)}</span>
                                        </div>
                                        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                                                className="h-full bg-gradient-to-r from-secondary to-primary rounded-full"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                        {assets.length === 0 && (
                            <p className="text-gray-500 text-sm text-center py-8">No assets yet. Create one to get started!</p>
                        )}
                    </div>
                </Card>

                {/* Income Card */}
                <Card className="md:col-span-4 h-56 bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20" delay={0.3}>
                    <div className="flex justify-between items-start mb-8">
                        <div className="p-2 bg-green-500/20 rounded-lg border border-green-500/30">
                            <ArrowDownRight className="w-6 h-6 text-green-400" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-gray-400 text-sm font-medium mb-1">Total Income</h3>
                        <div className="text-3xl font-bold text-green-400">
                            ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{transactions.filter(t => t.type === 'income').length} income transactions</p>
                    </div>
                </Card>

                {/* Expense Card */}
                <Card className="md:col-span-4 h-56 bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20" delay={0.35}>
                    <div className="flex justify-between items-start mb-8">
                        <div className="p-2 bg-red-500/20 rounded-lg border border-red-500/30">
                            <ArrowUpRight className="w-6 h-6 text-red-400" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-gray-400 text-sm font-medium mb-1">Total Expenses</h3>
                        <div className="text-3xl font-bold text-red-400">
                            ${totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{transactions.filter(t => t.type === 'expense').length} expense transactions</p>
                    </div>
                </Card>

                {/* Recent Activity */}
                <Card className="md:col-span-4 h-96" delay={0.4}>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold">Recent Activity</h3>
                    </div>
                    <div className="space-y-3 flex-1 overflow-y-auto">
                        {recentTransactions.map((tx, i) => {
                            const asset = null; // Could fetch asset name if needed
                            return (
                                <motion.div
                                    key={tx._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + i * 0.05 }}
                                    className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "h-10 w-10 rounded-full flex items-center justify-center border transition-colors",
                                            tx.type === 'income'
                                                ? "bg-green-500/20 border-green-500/30"
                                                : "bg-red-500/20 border-red-500/30"
                                        )}>
                                            {tx.type === 'income' ? (
                                                <ArrowDownRight className={cn("w-4 h-4", tx.type === 'income' ? "text-green-400" : "text-red-400")} />
                                            ) : (
                                                <ArrowUpRight className={cn("w-4 h-4", tx.type === 'income' ? "text-green-400" : "text-red-400")} />
                                            )}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-white">{tx.type.toUpperCase()}</div>
                                            <div className="text-xs text-gray-500">{new Date(tx.createdAt).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                    <div className={cn(
                                        "text-sm font-semibold",
                                        tx.type === 'income' ? "text-green-400" : "text-red-400"
                                    )}>
                                        {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                                    </div>
                                </motion.div>
                            );
                        })}
                        {recentTransactions.length === 0 && (
                            <p className="text-gray-500 text-sm text-center py-8">No transactions yet</p>
                        )}
                    </div>
                </Card>

                {/* Summary Stats */}
                <Card className="md:col-span-4 h-56 bg-gradient-to-br from-primary/20 to-surface border-primary/20" delay={0.5}>
                    <h3 className="text-lg font-semibold mb-6">Summary</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">Total Assets</span>
                            <span className="font-semibold text-white">{assets.length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">Total Transactions</span>
                            <span className="font-semibold text-white">{transactions.length}</span>
                        </div>
                        <div className="border-t border-white/5 pt-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm">Net Change</span>
                                <span className={cn(
                                    "font-semibold",
                                    totalIncome - totalExpense >= 0 ? "text-green-400" : "text-red-400"
                                )}>
                                    ${(totalIncome - totalExpense).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default DashboardView;
