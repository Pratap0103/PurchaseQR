import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useProduct } from '../context/ProductContext';
import { Package, TrendingUp, AlertCircle, CheckCircle, Calendar, ArrowRight, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, color, colorLight }) => (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-20 h-20 ${colorLight} rounded-bl-full opacity-50`}></div>
        <div className="relative flex items-start justify-between">
            <div>
                <p className="text-xs sm:text-sm font-medium text-slate-500 mb-1">{title}</p>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{value}</h3>
            </div>
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${color} flex items-center justify-center shadow-lg`}>
                <Icon size={20} className="text-white" />
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    const { user } = useAuth();
    const { products } = useProduct();

    // Calculate real stats from products data
    const totalProducts = products.length;
    const activeAssets = products.filter(p => p.status === 'Active').length;
    const maintenanceDue = products.filter(p => p.maintenanceRequired === 'Yes').length;
    const totalValue = products.reduce((sum, p) => sum + (parseInt(p.cost) || 0), 0);

    const formatValue = (val) => {
        if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
        if (val >= 1000) return `₹${(val / 1000).toFixed(1)}K`;
        return `₹${val}`;
    };

    const stats = [
        { title: 'Total Products', value: totalProducts, icon: Package, color: 'bg-light-blue-500', colorLight: 'bg-light-blue-100' },
        { title: 'Active Assets', value: activeAssets, icon: CheckCircle, color: 'bg-green-500', colorLight: 'bg-green-100' },
        { title: 'Maintenance Due', value: maintenanceDue, icon: AlertCircle, color: 'bg-amber-500', colorLight: 'bg-amber-100' },
        { title: 'Total Value', value: formatValue(totalValue), icon: TrendingUp, color: 'bg-indigo-500', colorLight: 'bg-indigo-100' },
    ];

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-light-blue-500 to-light-blue-600 rounded-2xl p-4 sm:p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="text-xl font-bold">{user?.name?.charAt(0) || 'U'}</span>
                    </div>
                    <div>
                        <p className="text-white/80 text-sm">Welcome back,</p>
                        <h1 className="text-xl sm:text-2xl font-bold">{user?.name}</h1>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm mt-3">
                    <Calendar size={14} />
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* Stats Grid - 2x2 on mobile */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Quick Actions - Mobile First */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <Link to="/products" className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:border-light-blue-200 hover:shadow-md transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-light-blue-100 flex items-center justify-center mb-3 group-hover:bg-light-blue-500 transition-colors">
                        <Package size={24} className="text-light-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-1">Add Product</h4>
                    <p className="text-xs text-slate-500">Add new inventory</p>
                </Link>
                <Link to="/products" className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:border-light-blue-200 hover:shadow-md transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-3 group-hover:bg-purple-500 transition-colors">
                        <QrCode size={24} className="text-purple-600 group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-1">Scan QR</h4>
                    <p className="text-xs text-slate-500">View product details</p>
                </Link>
            </div>

            {/* Recent Products - Card Style on Mobile */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">Recent Products</h3>
                    <Link to="/products" className="text-light-blue-600 text-sm font-medium flex items-center gap-1 hover:underline">
                        View All <ArrowRight size={14} />
                    </Link>
                </div>

                {products.length > 0 ? (
                    <div className="divide-y divide-slate-100">
                        {products.slice(-5).reverse().map((product) => (
                            <div key={product.id} className="p-4 hover:bg-slate-50 transition-colors">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-slate-900 truncate">{product.productName}</p>
                                        <div className="flex flex-wrap items-center gap-2 mt-1">
                                            <span className="text-xs text-light-blue-600 font-mono bg-light-blue-50 px-2 py-0.5 rounded">{product.sn}</span>
                                            <span className="text-xs text-slate-500">{product.category}</span>
                                        </div>
                                    </div>
                                    <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${product.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                                        }`}>
                                        {product.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                                    <span>{product.brand}</span>
                                    <span>•</span>
                                    <span>₹{parseInt(product.cost).toLocaleString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center text-slate-500">
                        <Package size={40} className="mx-auto mb-3 text-slate-300" />
                        <p>No products found.</p>
                        <Link to="/products" className="text-light-blue-600 text-sm hover:underline mt-2 inline-block">Add your first product</Link>
                    </div>
                )}
            </div>

            {/* Quick Stats Summary - Mobile Only */}
            <div className="sm:hidden bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-4">
                <p className="text-sm text-slate-600 text-center">
                    You have <span className="font-bold text-slate-900">{activeAssets}</span> active assets worth <span className="font-bold text-slate-900">{formatValue(totalValue)}</span>
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
