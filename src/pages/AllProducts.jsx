import React, { useState } from 'react';
import { Plus, Search, Filter, RefreshCw, ChevronLeft, ChevronRight, QrCode, FileText } from 'lucide-react';
import { useProduct } from '../context/ProductContext';
import AddProductModal from '../components/AddProductModal';
import QRCodeModal from '../components/QRCodeModal';
import BulkQRModal from '../components/BulkQRModal';

// Product Card for Mobile View - Now with more details and QR button
const ProductCard = ({ product, onShowQR }) => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 space-y-3">
        <div className="flex items-center justify-between">
            <span className="font-bold text-light-blue-700">{product.sn}</span>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onShowQR(product)}
                    className="p-1.5 text-light-blue-600 hover:bg-light-blue-50 rounded-lg transition-colors"
                    title="View QR Code"
                >
                    <QrCode size={18} />
                </button>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
                    }`}>
                    {product.status}
                </span>
            </div>
        </div>
        <h3 className="font-semibold text-slate-900 text-lg">{product.productName}</h3>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div><span className="text-slate-500">Category:</span> <span className="text-slate-700">{product.category}</span></div>
            <div><span className="text-slate-500">Type:</span> <span className="text-slate-700">{product.type}</span></div>
            <div><span className="text-slate-500">Brand:</span> <span className="text-slate-700">{product.brand}</span></div>
            <div><span className="text-slate-500">Model:</span> <span className="text-slate-700">{product.model}</span></div>
            <div><span className="text-slate-500">SKU:</span> <span className="text-slate-700">{product.sku}</span></div>
            <div><span className="text-slate-500">Origin:</span> <span className="text-slate-700">{product.origin}</span></div>
        </div>

        <div className="border-t pt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div><span className="text-slate-500">Cost:</span> <span className="font-medium text-slate-900">₹{product.cost}</span></div>
            <div><span className="text-slate-500">Qty:</span> <span className="text-slate-700">{product.quantity}</span></div>
            <div><span className="text-slate-500">Purchased:</span> <span className="text-slate-700">{product.purchaseDate}</span></div>
            <div><span className="text-slate-500">Invoice:</span> <span className="text-slate-700">{product.invoiceNo}</span></div>
            <div><span className="text-slate-500">Supplier:</span> <span className="text-slate-700">{product.supplierName}</span></div>
            <div><span className="text-slate-500">Payment:</span> <span className="text-slate-700">{product.paymentMode}</span></div>
        </div>

        <div className="border-t pt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div><span className="text-slate-500">Location:</span> <span className="text-slate-700">{product.location}</span></div>
            <div><span className="text-slate-500">Dept:</span> <span className="text-slate-700">{product.department}</span></div>
            <div><span className="text-slate-500">Assigned:</span> <span className="text-slate-700">{product.assignedTo}</span></div>
            <div><span className="text-slate-500">Responsible:</span> <span className="text-slate-700">{product.responsiblePerson}</span></div>
        </div>

        <div className="border-t pt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div><span className="text-slate-500">Warranty:</span> <span className="text-slate-700">{product.warrantyAvailable}</span></div>
            <div><span className="text-slate-500">AMC:</span> <span className="text-slate-700">{product.amc}</span></div>
            <div><span className="text-slate-500">Maintenance:</span> <span className="text-slate-700">{product.maintenanceRequired}</span></div>
            <div><span className="text-slate-500">Priority:</span> <span className="text-slate-700">{product.priority || '-'}</span></div>
        </div>
    </div>
);

const AllProducts = () => {
    const { products, clearAndReloadDummy } = useProduct();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);
    const [isBulkQROpen, setIsBulkQROpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(product =>
        product.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleReloadDummy = () => {
        if (confirm('This will replace all products with fresh dummy data. Continue?')) {
            clearAndReloadDummy();
        }
    };

    const handleShowQR = (product) => {
        setSelectedProduct(product);
        setIsQRModalOpen(true);
    };

    return (
        <div className="flex-1 w-full min-h-0 flex flex-col gap-4 p-4 lg:p-6 overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
                <h1 className="text-2xl font-bold text-slate-900">All Products</h1>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={handleReloadDummy}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        title="Reload dummy data"
                    >
                        <RefreshCw size={18} />
                    </button>
                    <button
                        onClick={() => setIsBulkQROpen(true)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-colors"
                    >
                        <FileText size={18} />
                        <span className="hidden sm:inline">Generate QR Codes</span>
                        <span className="sm:hidden">QR PDF</span>
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-light-blue-600 hover:bg-light-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-colors"
                    >
                        <Plus size={20} />
                        Add Product
                    </button>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="flex gap-4 shrink-0">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-light-blue-500"
                    />
                </div>
                <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 flex items-center gap-2 bg-white">
                    <Filter size={18} />
                    <span className="hidden sm:inline">Filter</span>
                </button>
            </div>


            {/* Mobile Card View (Scrollable) */}
            <div className="md:hidden flex-1 overflow-y-auto space-y-4 pr-1">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} onShowQR={handleShowQR} />
                    ))
                ) : (
                    <div className="bg-white rounded-xl p-8 text-center text-slate-500">
                        No products found.
                    </div>
                )}
            </div>

            {/* Desktop Table View - Full Width with Horizontal Scroll */}
            <div className="hidden md:flex flex-1 min-h-0 flex-col bg-white rounded-t-xl shadow-sm border-x border-t border-slate-100 border-b overflow-hidden">
                <div className="flex-1 overflow-auto w-full relative custom-scrollbar">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100 sticky top-0 z-20 shadow-sm">
                            <tr>
                                {/* Actions */}
                                <th className="px-4 py-3 sticky left-0 top-0 z-30 bg-slate-50 drop-shadow-sm">Actions</th>
                                {/* Section 1: Basic Info */}
                                <th className="px-4 py-3">Serial No</th>
                                <th className="px-4 py-3">Product Name</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Type</th>
                                <th className="px-4 py-3">Brand</th>
                                <th className="px-4 py-3">Model</th>
                                <th className="px-4 py-3">SKU</th>
                                <th className="px-4 py-3">Mfg Date</th>
                                <th className="px-4 py-3">Origin</th>
                                <th className="px-4 py-3">Status</th>
                                {/* Section 2: Purchase Info */}
                                <th className="px-4 py-3">Purchase Date</th>
                                <th className="px-4 py-3">Invoice No</th>
                                <th className="px-4 py-3 text-right">Cost</th>
                                <th className="px-4 py-3">Qty</th>
                                <th className="px-4 py-3">Supplier</th>
                                <th className="px-4 py-3">Payment</th>
                                {/* Section 3: Location */}
                                <th className="px-4 py-3">Location</th>
                                <th className="px-4 py-3">Department</th>
                                <th className="px-4 py-3">Assigned To</th>
                                <th className="px-4 py-3">Responsible</th>
                                {/* Section 4: Warranty */}
                                <th className="px-4 py-3">Warranty</th>
                                <th className="px-4 py-3">AMC</th>
                                {/* Section 5: Maintenance */}
                                <th className="px-4 py-3">Maintenance</th>
                                <th className="px-4 py-3">Priority</th>
                                {/* Section 8: Financial */}
                                <th className="px-4 py-3 text-right">Asset Value</th>
                                <th className="px-4 py-3">Dep. Method</th>
                                {/* Section 10: System */}
                                <th className="px-4 py-3">Created By</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                                        {/* Actions - QR Code Button */}
                                        <td className="px-4 py-3 sticky left-0 bg-white">
                                            <button
                                                onClick={() => handleShowQR(product)}
                                                className="p-2 text-light-blue-600 hover:bg-light-blue-50 rounded-lg transition-colors"
                                                title="View QR Code"
                                            >
                                                <QrCode size={18} />
                                            </button>
                                        </td>
                                        {/* Section 1 */}
                                        <td className="px-4 py-3 font-medium text-light-blue-700">{product.sn}</td>
                                        <td className="px-4 py-3 text-slate-900 font-medium">{product.productName}</td>
                                        <td className="px-4 py-3 text-slate-600">{product.category}</td>
                                        <td className="px-4 py-3 text-slate-600">{product.type}</td>
                                        <td className="px-4 py-3 text-slate-600">{product.brand}</td>
                                        <td className="px-4 py-3 text-slate-600">{product.model}</td>
                                        <td className="px-4 py-3 text-slate-600">{product.sku}</td>
                                        <td className="px-4 py-3 text-slate-600">{product.mfgDate}</td>
                                        <td className="px-4 py-3 text-slate-600">{product.origin}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        {/* Section 2 */}
                                        <td className="px-4 py-3 text-slate-600">{product.purchaseDate}</td>
                                        <td className="px-4 py-3 text-slate-600">{product.invoiceNo}</td>
                                        <td className="px-4 py-3 text-right text-slate-900">₹{product.cost}</td>
                                        <td className="px-4 py-3 text-slate-600">{product.quantity}</td>
                                        <td className="px-4 py-3 text-slate-600">{product.supplierName}</td>
                                        <td className="px-4 py-3 text-slate-600">{product.paymentMode}</td>
                                        {/* Section 3 */}
                                        <td className="px-4 py-3 text-slate-600">{product.location}</td>
                                        <td className="px-4 py-3 text-slate-600">{product.department}</td>
                                        <td className="px-4 py-3 text-slate-600">{product.assignedTo}</td>
                                        <td className="px-4 py-3 text-slate-600">{product.responsiblePerson}</td>
                                        {/* Section 4 */}
                                        <td className="px-4 py-3 text-slate-600">{product.warrantyAvailable}</td>
                                        <td className="px-4 py-3 text-slate-600">{product.amc}</td>
                                        {/* Section 5 */}
                                        <td className="px-4 py-3 text-slate-600">{product.maintenanceRequired}</td>
                                        <td className="px-4 py-3 text-slate-600">{product.priority || '-'}</td>
                                        {/* Section 8 */}
                                        <td className="px-4 py-3 text-right text-slate-900">₹{product.assetValue}</td>
                                        <td className="px-4 py-3 text-slate-600">{product.depMethod}</td>
                                        {/* Section 10 */}
                                        <td className="px-4 py-3 text-slate-600">{product.createdBy}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="28" className="px-4 py-12 text-center text-slate-500">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>



            <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <QRCodeModal
                isOpen={isQRModalOpen}
                onClose={() => setIsQRModalOpen(false)}
                product={selectedProduct}
            />
            <BulkQRModal
                isOpen={isBulkQROpen}
                onClose={() => setIsBulkQROpen(false)}
                products={products}
            />
        </div>
    );
};

export default AllProducts;
