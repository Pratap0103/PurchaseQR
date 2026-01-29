import React, { useState } from 'react';
import { X, Upload, Plus, Trash2 } from 'lucide-react';
import { useProduct } from '../context/ProductContext';

const MAX_SECTIONS = 10;

const InputField = ({ label, name, type = "text", value, onChange, placeholder, options, required = false }) => (
    <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {type === 'select' ? (
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:border-transparent bg-white"
                required={required}
            >
                <option value="">Select {label}</option>
                {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        ) : type === 'textarea' ? (
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                rows="3"
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:border-transparent"
                placeholder={placeholder}
            />
        ) : (
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:border-transparent"
                placeholder={placeholder}
                required={required}
            />
        )}
    </div>
);

const SectionHeader = ({ title }) => (
    <h3 className="text-lg font-bold text-light-blue-800 border-b border-light-blue-100 pb-2 mb-4 mt-2">
        {title}
    </h3>
);

const AddProductModal = ({ isOpen, onClose }) => {
    const { addProduct } = useProduct();
    const [activeTab, setActiveTab] = useState(0); // For optional tabbed view, or just scroll? 
    // Given 10 sections, a long scroll with clear headers is simpler, or tabs. 
    // Prompt says "pop-pop form", implies modal. 10 sections in a modal is a lot.
    // I will make it scrollable with a fixed header/footer.

    const [formData, setFormData] = useState({
        // Section 1
        productName: '', category: '', type: '', brand: '', model: '', serialNo: '', sku: '', mfgDate: '', origin: '', status: 'Active',
        // Section 2
        purchaseDate: '', invoiceNo: '', cost: '', quantity: '', supplierName: '', supplierPhone: '', supplierEmail: '', paymentMode: '',
        // Section 3
        location: '', department: '', assignedTo: '', usageType: '', storageLoc: '', responsiblePerson: '',
        // Section 4
        warrantyAvailable: 'No', warrantyProvider: '', warrantyStart: '', warrantyEnd: '', amc: 'No', amcProvider: '', amcStart: '', amcEnd: '', serviceContact: '',
        // Section 5
        maintenanceRequired: 'No', maintenanceType: '', frequency: '', nextService: '', priority: '', technician: '', maintenanceNotes: '',
        // Section 7 (Dynamic Specs)
        specs: [],
        // Section 8
        assetValue: '', depMethod: '', depRate: '', assetLife: '', residualValue: '',
        // Section 9
        internalNotes: '', usageRemarks: '', condition: '',
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSpecChange = (index, field, value) => {
        const newSpecs = [...formData.specs];
        newSpecs[index][field] = value;
        setFormData(prev => ({ ...prev, specs: newSpecs }));
    };

    const addSpec = () => {
        setFormData(prev => ({ ...prev, specs: [...prev.specs, { name: '', value: '' }] }));
    };

    const removeSpec = (index) => {
        const newSpecs = formData.specs.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, specs: newSpecs }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-light-blue-50 rounded-t-xl">
                    <h2 className="text-2xl font-bold text-light-blue-900">Add New Product</h2>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-slate-500">
                        <X size={24} />
                    </button>
                </div>

                {/* content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <form id="product-form" onSubmit={handleSubmit} className="space-y-8">

                        {/* SECTION 1 */}
                        <section>
                            <SectionHeader title="SECTION 1: Basic Product Information" />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <InputField label="Product Name" name="productName" value={formData.productName} onChange={handleChange} required />
                                <InputField label="Category" name="category" type="select" options={['Electronics', 'Machinery', 'Furniture', 'IT', 'Tools']} value={formData.category} onChange={handleChange} />
                                <InputField label="Type" name="type" type="select" options={['Consumable', 'Non-Consumable', 'Asset']} value={formData.type} onChange={handleChange} />
                                <InputField label="Brand/Manufacturer" name="brand" value={formData.brand} onChange={handleChange} />
                                <InputField label="Model Number" name="model" value={formData.model} onChange={handleChange} />
                                <InputField label="Serial Number" name="serialNo" value={formData.serialNo} onChange={handleChange} />
                                <InputField label="SKU / Code" name="sku" value={formData.sku} onChange={handleChange} />
                                <InputField label="Mfg Date" name="mfgDate" type="month" value={formData.mfgDate} onChange={handleChange} />
                                <InputField label="Country of Origin" name="origin" value={formData.origin} onChange={handleChange} />
                                <InputField label="Status" name="status" type="select" options={['Active', 'Inactive']} value={formData.status} onChange={handleChange} />
                            </div>
                        </section>

                        {/* SECTION 2 */}
                        <section>
                            <SectionHeader title="SECTION 2: Purchase Information" />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <InputField label="Purchase Date" name="purchaseDate" type="date" value={formData.purchaseDate} onChange={handleChange} />
                                <InputField label="Invoice Number" name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} />
                                <InputField label="Purchase Cost" name="cost" type="number" value={formData.cost} onChange={handleChange} />
                                <InputField label="Quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} />
                                <InputField label="Supplier Name" name="supplierName" value={formData.supplierName} onChange={handleChange} />
                                <InputField label="Supplier Phone" name="supplierPhone" value={formData.supplierPhone} onChange={handleChange} />
                                <InputField label="Supplier Email" name="supplierEmail" type="email" value={formData.supplierEmail} onChange={handleChange} />
                                <InputField label="Payment Mode" name="paymentMode" type="select" options={['Cash', 'Online', 'Credit']} value={formData.paymentMode} onChange={handleChange} />
                            </div>
                        </section>

                        {/* SECTION 3 */}
                        <section>
                            <SectionHeader title="SECTION 3: Location & Ownership" />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <InputField label="Assigned Location" name="location" type="select" options={['Warehouse', 'Office', 'Plant']} value={formData.location} onChange={handleChange} />
                                <InputField label="Department" name="department" type="select" options={['IT', 'Production', 'Admin']} value={formData.department} onChange={handleChange} />
                                <InputField label="Assigned To" name="assignedTo" value={formData.assignedTo} onChange={handleChange} placeholder="Employee or Team" />
                                <InputField label="Usage Type" name="usageType" type="select" options={['Internal', 'External']} value={formData.usageType} onChange={handleChange} />
                                <InputField label="Storage Location" name="storageLoc" value={formData.storageLoc} onChange={handleChange} placeholder="Rack / Room" />
                                <InputField label="Responsible Person" name="responsiblePerson" value={formData.responsiblePerson} onChange={handleChange} />
                            </div>
                        </section>

                        {/* SECTION 4 */}
                        <section>
                            <SectionHeader title="SECTION 4: Warranty & Service Details" />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <InputField label="Warranty Available" name="warrantyAvailable" type="select" options={['Yes', 'No']} value={formData.warrantyAvailable} onChange={handleChange} />
                                {formData.warrantyAvailable === 'Yes' && (
                                    <>
                                        <InputField label="Provider" name="warrantyProvider" value={formData.warrantyProvider} onChange={handleChange} />
                                        <InputField label="Start Date" name="warrantyStart" type="date" value={formData.warrantyStart} onChange={handleChange} />
                                        <InputField label="End Date" name="warrantyEnd" type="date" value={formData.warrantyEnd} onChange={handleChange} />
                                    </>
                                )}
                                <InputField label="AMC Contract" name="amc" type="select" options={['Yes', 'No']} value={formData.amc} onChange={handleChange} />
                                {formData.amc === 'Yes' && (
                                    <>
                                        <InputField label="AMC Provider" name="amcProvider" value={formData.amcProvider} onChange={handleChange} />
                                        <InputField label="Start Date" name="amcStart" type="date" value={formData.amcStart} onChange={handleChange} />
                                        <InputField label="End Date" name="amcEnd" type="date" value={formData.amcEnd} onChange={handleChange} />
                                    </>
                                )}
                                <InputField label="Service Contact" name="serviceContact" value={formData.serviceContact} onChange={handleChange} />
                            </div>
                        </section>

                        {/* SECTION 5 */}
                        <section>
                            <SectionHeader title="SECTION 5: Maintenance Configuration" />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <InputField label="Maintenance Req." name="maintenanceRequired" type="select" options={['Yes', 'No']} value={formData.maintenanceRequired} onChange={handleChange} />
                                {formData.maintenanceRequired === 'Yes' && (
                                    <>
                                        <InputField label="Type" name="maintenanceType" type="select" options={['Preventive', 'Breakdown']} value={formData.maintenanceType} onChange={handleChange} />
                                        <InputField label="Frequency" name="frequency" type="select" options={['Monthly', 'Quarterly', 'Yearly']} value={formData.frequency} onChange={handleChange} />
                                        <InputField label="Next Date" name="nextService" type="date" value={formData.nextService} onChange={handleChange} />
                                        <InputField label="Priority" name="priority" type="select" options={['Low', 'Medium', 'High']} value={formData.priority} onChange={handleChange} />
                                        <InputField label="Technician" name="technician" value={formData.technician} onChange={handleChange} />
                                    </>
                                )}
                                <div className="col-span-1 md:col-span-2">
                                    <InputField label="Maintenance Notes" name="maintenanceNotes" type="textarea" value={formData.maintenanceNotes} onChange={handleChange} />
                                </div>
                            </div>
                        </section>

                        {/* SECTION 6 */}
                        <section>
                            <SectionHeader title="SECTION 6: Documentation Upload" />
                            <div className="p-4 border border-dashed border-slate-300 rounded-lg bg-slate-50 text-center">
                                <Upload className="mx-auto h-12 w-12 text-slate-400" />
                                <p className="mt-2 text-sm text-slate-600">Upload Product Images, User Manuals, Warranty Cards etc.</p>
                                <button type="button" className="mt-2 px-4 py-2 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50">
                                    Select Files
                                </button>
                            </div>
                        </section>

                        {/* SECTION 7 */}
                        <section>
                            <SectionHeader title="SECTION 7: Technical Specifications" />
                            <div className="space-y-3">
                                {formData.specs.map((spec, index) => (
                                    <div key={index} className="flex gap-4 items-end">
                                        <div className="flex-1">
                                            <InputField label="Spec Name" value={spec.name} onChange={(e) => handleSpecChange(index, 'name', e.target.value)} placeholder="e.g. Ram, Capacity" />
                                        </div>
                                        <div className="flex-1">
                                            <InputField label="Value" value={spec.value} onChange={(e) => handleSpecChange(index, 'value', e.target.value)} placeholder="e.g. 16GB" />
                                        </div>
                                        <button type="button" onClick={() => removeSpec(index)} className="p-2 text-red-500 hover:bg-red-50 rounded mb-1">
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                ))}
                                <button type="button" onClick={addSpec} className="flex items-center gap-2 text-sm text-light-blue-600 font-medium hover:text-light-blue-700">
                                    <Plus size={16} /> Add Specification
                                </button>
                            </div>
                        </section>

                        {/* SECTION 8 */}
                        <section>
                            <SectionHeader title="SECTION 8: Financial & Depreciation" />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <InputField label="Asset Value" name="assetValue" type="number" value={formData.assetValue} onChange={handleChange} />
                                <InputField label="Depreciation Method" name="depMethod" type="select" options={['Straight Line', 'WDV']} value={formData.depMethod} onChange={handleChange} />
                                <InputField label="Rate (%)" name="depRate" type="number" value={formData.depRate} onChange={handleChange} />
                                <InputField label="Life (Years)" name="assetLife" type="number" value={formData.assetLife} onChange={handleChange} />
                                <InputField label="Residual Value" name="residualValue" type="number" value={formData.residualValue} onChange={handleChange} />
                            </div>
                        </section>

                        {/* SECTION 9 */}
                        <section>
                            <SectionHeader title="SECTION 9: Notes & Remarks" />
                            <div className="grid grid-cols-1 gap-4">
                                <InputField label="Internal Notes" name="internalNotes" type="textarea" value={formData.internalNotes} onChange={handleChange} />
                                <InputField label="Usage Remarks" name="usageRemarks" type="textarea" value={formData.usageRemarks} onChange={handleChange} />
                                <InputField label="Condition Notes" name="condition" type="textarea" value={formData.condition} onChange={handleChange} />
                            </div>
                        </section>

                    </form>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 bg-white rounded-b-xl flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="product-form"
                        className="px-6 py-2 bg-light-blue-600 hover:bg-light-blue-700 text-white rounded-lg font-medium shadow-md transition-colors"
                    >
                        Save Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProductModal;
