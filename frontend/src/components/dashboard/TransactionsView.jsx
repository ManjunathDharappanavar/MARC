import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, ArrowUpRight, ArrowDownLeft, ActivitySquare } from 'lucide-react';
import { useCreateTransaction, useDeleteTransaction } from '../../hooks/useTransactions';
import { cn } from '../../utils/cn';
import toast from 'react-hot-toast';

const TransactionForm = ({ assets, onClose }) => {
    const [formData, setFormData] = useState({ assetId: '', type: 'expense', amount: 0 });
    const createMutation = useCreateTransaction();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.assetId) {
            toast.error('Please select an asset');
            return;
        }
        if (formData.amount <= 0) {
            toast.error('Amount must be greater than 0');
            return;
        }
        try {
            await createMutation.mutateAsync(formData);
            toast.success('Transaction created successfully');
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create transaction');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                onClick={e => e.stopPropagation()}
                className="glass-panel p-8 max-w-md w-full"
            >
                <h2 className="text-2xl font-bold mb-6">Add Transaction</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Select Asset</label>
                        <select
                            value={formData.assetId}
                            onChange={(e) => setFormData({ ...formData, assetId: e.target.value })}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-secondary text-white"
                        >
                            <option value="" className="bg-surface">Choose an asset...</option>
                            {assets.map(asset => (
                                <option key={asset._id} value={asset._id} className="bg-surface">
                                    {asset.name} (${asset.value.toFixed(2)})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                        <div className="flex gap-3">
                            {['income', 'expense'].map(type => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type })}
                                    className={cn(
                                        "flex-1 px-4 py-2 rounded-lg font-medium transition-colors",
                                        formData.type === type
                                            ? type === 'income'
                                                ? "bg-green-500/30 text-green-300 border border-green-500/50"
                                                : "bg-red-500/30 text-red-300 border border-red-500/50"
                                            : "bg-white/5 text-gray-300 hover:bg-white/10"
                                    )}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Amount ($)</label>
                        <input
                            type="number"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                            placeholder="0.00"
                            step="0.01"
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-secondary text-white"
                            required
                        />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={createMutation.isPending}
                            className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-secondary to-primary text-white font-semibold hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] disabled:opacity-50"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

const TransactionsView = ({ transactions, isLoading, assets }) => {
    const [showForm, setShowForm] = useState(false);
    const deleteMutation = useDeleteTransaction();

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this transaction? This will reverse its effect on the asset.')) {
            try {
                await deleteMutation.mutateAsync(id);
                toast.success('Transaction deleted successfully');
            } catch (error) {
                toast.error('Failed to delete transaction');
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }} className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full" />
            </div>
        );
    }

    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const incomeTotal = sortedTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expenseTotal = sortedTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

    return (
        <div className="max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-8"
            >
                <div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2">
                        Transactions
                    </h1>
                    <p className="text-gray-500">Track your income and expenses ({transactions.length} total)</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    disabled={assets.length === 0}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary to-primary text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    title={assets.length === 0 ? 'Create an asset first' : ''}
                >
                    <Plus className="w-4 h-4" /> Add Transaction
                </button>
            </motion.div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                            <ArrowDownLeft className="w-5 h-5 text-green-400" />
                        </div>
                        <span className="text-gray-400 font-medium">Total Income</span>
                    </div>
                    <div className="text-3xl font-bold text-green-400">
                        ${incomeTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-panel p-6 bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-red-500/20 rounded-lg">
                            <ArrowUpRight className="w-5 h-5 text-red-400" />
                        </div>
                        <span className="text-gray-400 font-medium">Total Expenses</span>
                    </div>
                    <div className="text-3xl font-bold text-red-400">
                        ${expenseTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel p-6 bg-gradient-to-br from-primary/10 to-secondary/10"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/20 rounded-lg">
                            <ActivitySquare className="w-5 h-5 text-secondary" />
                        </div>
                        <span className="text-gray-400 font-medium">Net</span>
                    </div>
                    <div className={cn(
                        "text-3xl font-bold",
                        incomeTotal - expenseTotal >= 0 ? "text-green-400" : "text-red-400"
                    )}>
                        ${(incomeTotal - expenseTotal).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                </motion.div>
            </div>

            {transactions.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-12 text-center"
                >
                    <ActivitySquare className="w-16 h-16 text-gray-500 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">No Transactions Yet</h3>
                    <p className="text-gray-400 mb-6">Create your first transaction to start tracking your finances</p>
                    <button
                        onClick={() => setShowForm(true)}
                        disabled={assets.length === 0}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary to-primary text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] disabled:opacity-50"
                    >
                        <Plus className="w-4 h-4" /> Add Transaction
                    </button>
                </motion.div>
            ) : (
                <div className="glass-panel overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Date</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Type</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Asset</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">Amount</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedTransactions.map((tx, i) => {
                                    const asset = assets.find(a => a._id === tx.assetId);
                                    return (
                                        <motion.tr
                                            key={tx._id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                        >
                                            <td className="px-6 py-4 text-sm text-gray-300">
                                                {new Date(tx.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className={cn(
                                                    "px-3 py-1 rounded-full text-xs font-semibold",
                                                    tx.type === 'income'
                                                        ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                                        : "bg-red-500/20 text-red-300 border border-red-500/30"
                                                )}>
                                                    {tx.type.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-300">
                                                {asset?.name || 'Unknown'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-right font-semibold">
                                                <span className={cn(
                                                    tx.type === 'income' ? "text-green-400" : "text-red-400"
                                                )}>
                                                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleDelete(tx._id)}
                                                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
                                                    title="Delete transaction"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {showForm && (
                <TransactionForm assets={assets} onClose={() => setShowForm(false)} />
            )}
        </div>
    );
};

export default TransactionsView;
