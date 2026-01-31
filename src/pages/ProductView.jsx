// ProductView.jsx with Context usage
import React from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import Footer from '../components/Footer';
import { Package, MapPin, Shield, Wrench, DollarSign, FileText, Building2, Tag, Globe, CreditCard, Clock, CheckCircle, XCircle, Calendar } from 'lucide-react';

const ProductView = () => {
    const { productId } = useParams();
    const { products } = useProduct(); // Access via Context ensures initialization

    const product = products.find(p => p.sn === productId || p.id === parseInt(productId));

    if (!product) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full text-center border border-slate-200">
                    <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
                        <Package size={40} className="text-slate-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h1>
                    <p className="text-slate-500 mb-4 text-sm">The product you're looking for doesn't exist or has been removed.</p>
                    <div className="text-xs text-slate-400 bg-slate-50 px-3 py-2 rounded-lg">ID: {productId}</div>
                </div>
            </div>
        );
    }

    const isActive = product.status === 'Active';

    return (
        <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
            {/* Hero Header - Ultra Compact */}
            <div className="bg-gradient-to-br from-light-blue-600 to-light-blue-700 shrink-0 shadow-sm z-20">
                <div className="max-w-2xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        {/* Left: Title & SN */}
                        <div className="text-left">
                            <h1 className="text-lg font-bold text-white leading-tight mb-0.5">
                                {product.productName}
                            </h1>
                            <div className="flex items-center gap-2">
                                <span className="text-white/80 font-mono text-xs">{product.sn}</span>
                                <span className="text-white/60 text-[10px]">• {product.brand}</span>
                            </div>
                        </div>

                        {/* Right: Status Badge */}
                        <div className="shrink-0">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur border border-white/10">
                                {isActive ? (
                                    <CheckCircle size={12} className="text-green-300" />
                                ) : (
                                    <XCircle size={12} className="text-red-200" />
                                )}
                                <span className="text-xs font-semibold text-white">
                                    {product.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-2xl mx-auto px-4 py-6 space-y-4 flex-1 w-full overflow-y-auto">

                {/* Key Metrics - 2x2 Grid on Mobile */}
                <div className="grid grid-cols-2 gap-3 relative z-10">
                    <MetricCard
                        label="Cost"
                        value={`₹${parseInt(product.cost).toLocaleString()}`}
                        icon={DollarSign}
                        color="bg-green-500"
                    />
                    <MetricCard
                        label="Asset Value"
                        value={`₹${parseInt(product.assetValue).toLocaleString()}`}
                        icon={TrendingUp}
                        color="bg-light-blue-500"
                    />
                    <MetricCard
                        label="Quantity"
                        value={product.quantity}
                        icon={Package}
                        color="bg-purple-500"
                    />
                    <MetricCard
                        label="Asset Life"
                        value={`${product.assetLife} Yrs`}
                        icon={Clock}
                        color="bg-amber-500"
                    />
                </div>

                {/* Info Cards - Stacked on Mobile */}
                <InfoCard title="Basic Information" icon={Package} color="bg-light-blue-500">
                    <InfoRow label="Type" value={product.type} />
                    <InfoRow label="Model" value={product.model} />
                    <InfoRow label="SKU" value={product.sku} />
                    <InfoRow label="Serial No" value={product.serialNo} />
                    <InfoRow label="Mfg Date" value={product.mfgDate} />
                </InfoCard>

                <InfoCard title="Asset Details" icon={CreditCard} color="bg-green-500">
                    <InfoRow label="Asset Date" value={product.assetDate} />
                    <InfoRow label="Invoice No" value={product.invoiceNo} />
                    <InfoRow label="Supplier" value={product.supplierName} />
                    <InfoRow label="Payment" value={product.paymentMode} />
                    <InfoRow label="Contact" value={product.supplierPhone} />
                </InfoCard>

                <InfoCard title="Location & Ownership" icon={MapPin} color="bg-indigo-500">
                    <InfoRow label="Location" value={product.location} />
                    <InfoRow label="Department" value={product.department} />
                    <InfoRow label="Assigned To" value={product.assignedTo} />
                    <InfoRow label="Storage" value={product.storageLoc} />
                    <InfoRow label="Responsible" value={product.responsiblePerson} />
                </InfoCard>

                <InfoCard title="Warranty & Service" icon={Shield} color="bg-teal-500">
                    <InfoRow label="Warranty" value={product.warrantyAvailable} highlight={product.warrantyAvailable === 'Yes'} />
                    <InfoRow label="Provider" value={product.warrantyProvider || '-'} />
                    <InfoRow label="Valid Till" value={product.warrantyEnd || '-'} />
                    <InfoRow label="AMC" value={product.amc} highlight={product.amc === 'Yes'} />
                    <InfoRow label="AMC Provider" value={product.amcProvider || '-'} />
                </InfoCard>

                <InfoCard title="Maintenance" icon={Wrench} color="bg-orange-500">
                    <InfoRow label="Required" value={product.maintenanceRequired} highlight={product.maintenanceRequired === 'Yes'} />
                    <InfoRow label="Type" value={product.maintenanceType || '-'} />
                    <InfoRow label="Frequency" value={product.frequency || '-'} />
                    <InfoRow label="Next Service" value={product.nextService || '-'} />
                    <InfoRow label="Technician" value={product.technician || '-'} />
                </InfoCard>

                <InfoCard title="Financial" icon={DollarSign} color="bg-emerald-500">
                    <InfoRow label="Asset Value" value={`₹${parseInt(product.assetValue).toLocaleString()}`} />
                    <InfoRow label="Dep Method" value={product.depMethod} />
                    <InfoRow label="Dep Rate" value={`${product.depRate}%`} />
                    <InfoRow label="Residual" value={`₹${parseInt(product.residualValue).toLocaleString()}`} />
                </InfoCard>

                {/* Repair & Parts Details Card */}
                <InfoCard title="Repair & Parts History" icon={Wrench} color="bg-rose-500">
                    <InfoRow label="Last Repair" value={product.lastRepairDate} />
                    <InfoRow label="Last Cost" value={product.repairCost ? `₹${product.repairCost}` : '-'} />
                    <InfoRow label="Parts Changed?" value={product.partChanged} highlight={product.partChanged === 'Yes'} />
                    <InfoRow label="Total Repairs" value={product.repairCount} />
                    <InfoRow label="Total Cost" value={product.totalRepairCost ? `₹${product.totalRepairCost}` : '-'} />

                    {product.partNames && product.partNames.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-100">
                            <p className="text-xs text-slate-500 mb-2">Parts Replaced</p>
                            <div className="flex flex-wrap gap-2">
                                {product.partNames.map((part, index) => (
                                    <span key={index} className="px-2 py-1 bg-rose-50 text-rose-700 rounded-md text-xs font-medium border border-rose-100">
                                        {part}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </InfoCard>

                {/* Notes Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3 bg-slate-50">
                        <div className="w-8 h-8 rounded-lg bg-slate-500 flex items-center justify-center">
                            <FileText size={14} className="text-white" />
                        </div>
                        <h3 className="font-semibold text-slate-900 text-sm">Notes & Condition</h3>
                    </div>
                    <div className="p-4 space-y-3">
                        {product.internalNotes && (
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Notes</p>
                                <p className="text-sm text-slate-700">{product.internalNotes}</p>
                            </div>
                        )}
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500">Condition</span>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${product.condition === 'Good' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                }`}>
                                {product.condition}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Record Info Footer - Simplified */}
                <div className="text-center py-4 mt-6 opacity-60 hover:opacity-100 transition-opacity">
                    <div className="flex items-center justify-center gap-2 text-slate-400 text-xs mb-1">
                        <Calendar size={12} />
                        Created {new Date(product.createdDate).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </div>
                    <p className="text-slate-300 text-xs">
                        by {product.createdBy}
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

// Metric Card Component - Compact for Mobile
const MetricCard = ({ label, value, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-3 sm:p-4">
        <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center mb-2`}>
            <Icon size={16} className="text-white" />
        </div>
        <p className="text-lg sm:text-xl font-bold text-slate-900 truncate">{value}</p>
        <p className="text-xs text-slate-500">{label}</p>
    </div>
);

// TrendingUp icon component
const TrendingUp = ({ size, className }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
);

// Info Card Component - Mobile Optimized
const InfoCard = ({ title, icon: Icon, color, children }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3 bg-slate-50">
            <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center`}>
                <Icon size={14} className="text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 text-sm">{title}</h3>
        </div>
        <div className="p-4 space-y-2">
            {children}
        </div>
    </div>
);

// Info Row Component - Compact
const InfoRow = ({ label, value, highlight }) => (
    <div className="flex justify-between items-center py-1">
        <span className="text-slate-500 text-xs sm:text-sm">{label}</span>
        <span className={`text-xs sm:text-sm font-medium text-right ${highlight ? 'text-green-600' : 'text-slate-800'}`}>
            {value || '-'}
        </span>
    </div>
);

export default ProductView;
