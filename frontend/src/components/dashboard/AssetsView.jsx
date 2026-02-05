import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Package } from 'lucide-react';
import { useCreateAsset, useUpdateAsset, useDeleteAsset } from '../../hooks/useAssets';
import { cn } from '../../utils/cn';
import toast from 'react-hot-toast';

const CATEGORIES = ['Bank', 'Investment', 'Real Estate', 'Vehicle', 'Cryptocurrency', 'Other'];

const AssetForm = ({ asset, onClose }) => {
    const [formData, setFormData] = useState(asset || { name: '', category: 'Bank', value: 0 });
    const createMutation = useCreateAsset();
    const updateMutation = useUpdateAsset();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (asset) {
                await updateMutation.mutateAsync({ id: asset._id, data: formData });
                toast.success('Asset updated successfully');
            } else {
                await createMutation.mutateAsync(formData);
                toast.success('Asset created successfully');
            }
            onClose();
        } catch (error) {
            toast.error('Failed to save asset');
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
                <h2 className="text-2xl font-bold mb-6">{asset ? 'Edit Asset' : 'Add New Asset'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Asset Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g., Savings Account"
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-secondary text-white placeholder-gray-600"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-secondary text-white"
                        >
                            {CATEGORIES.map(cat => (
                                <option key={cat} value={cat} className="bg-surface">{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Value ($)</label>
                        <input
                            type="number"
                            value={formData.value}
                            onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })}
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
                            disabled={createMutation.isPending || updateMutation.isPending}
                            className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-secondary to-primary text-white font-semibold hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] disabled:opacity-50"
                        >
                            {asset ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

const AssetsView = ({ assets, isLoading }) => {
    const [showForm, setShowForm] = useState(false);
    const [editingAsset, setEditingAsset] = useState(null);
    const deleteMutation = useDeleteAsset();

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this asset?')) {
            try {
                await deleteMutation.mutateAsync(id);
                toast.success('Asset deleted successfully');
            } catch (error) {
                toast.error('Failed to delete asset');
            }
        }
    };

    const handleEdit = (asset) => {
        setEditingAsset(asset);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingAsset(null);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }} className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-8"
            >
                <div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2">
                        Assets
                    </h1>
                    <p className="text-gray-500">Manage your portfolio of {assets.length} assets</p>
                </div>
                <button
                    onClick={() => {
                        setEditingAsset(null);
                        setShowForm(true);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary to-primary text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all"
                >
                    <Plus className="w-4 h-4" /> Add Asset
                </button>
            </motion.div>

            {assets.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-12 text-center"
                >
                    <Package className="w-16 h-16 text-gray-500 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">No Assets Yet</h3>
                    <p className="text-gray-400 mb-6">Create your first asset to start tracking your wealth</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary to-primary text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]"
                    >
                        <Plus className="w-4 h-4" /> Create Asset
                    </button>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {assets.map((asset, i) => (
                        <motion.div
                            key={asset._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ y: -5 }}
                            className="glass-panel p-6 group cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold">{asset.name}</h3>
                                    <p className="text-sm text-gray-400">{asset.category}</p>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEdit(asset)}
                                        className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors text-blue-400"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(asset._id)}
                                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-gradient mb-2">
                                ${asset.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                            <p className="text-xs text-gray-500">
                                Created {new Date(asset.createdAt).toLocaleDateString()}
                            </p>
                        </motion.div>
                    ))}
                </div>
            )}

            {(showForm || editingAsset) && (
                <AssetForm asset={editingAsset} onClose={handleCloseForm} />
            )}
        </div>
    );
};

export default AssetsView;
