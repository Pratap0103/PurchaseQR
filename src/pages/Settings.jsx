import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Shield, Bell, Palette, ChevronRight, Check } from 'lucide-react';

const Settings = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Settings</h1>
            </div>

            {/* Profile Card - Full Width */}
            <div className="bg-gradient-to-r from-light-blue-500 to-light-blue-600 rounded-2xl p-4 sm:p-6 text-white">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 flex items-center justify-center text-2xl sm:text-3xl font-bold">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl sm:text-2xl font-bold">{user?.name}</h2>
                        <p className="text-white/80 text-sm sm:text-base capitalize">{user?.role} Account</p>
                        <p className="text-white/60 text-xs sm:text-sm mt-1">{user?.id}@company.com</p>
                    </div>
                </div>
            </div>

            {/* Settings Sections - Card Style */}
            <div className="space-y-3">
                {/* Profile Settings */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-light-blue-100 flex items-center justify-center">
                            <User size={20} className="text-light-blue-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-slate-900">Profile Settings</h3>
                            <p className="text-xs text-slate-500">Manage your account details</p>
                        </div>
                    </div>
                    <div className="p-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Display Name</label>
                            <input
                                type="text"
                                defaultValue={user?.name}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:border-transparent text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                            <input
                                type="email"
                                defaultValue={`${user?.id}@company.com`}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:border-transparent text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                            <Shield size={20} className="text-green-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-slate-900">Security</h3>
                            <p className="text-xs text-slate-500">Update password & security</p>
                        </div>
                    </div>
                    <div className="p-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:border-transparent text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:border-transparent text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                            <Bell size={20} className="text-amber-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-slate-900">Notifications</h3>
                            <p className="text-xs text-slate-500">Manage alert preferences</p>
                        </div>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {[
                            { name: 'Email Notifications', desc: 'Receive updates via email', checked: true },
                            { name: 'Push Notifications', desc: 'Get instant alerts', checked: true },
                            { name: 'Maintenance Alerts', desc: 'Service reminders', checked: false },
                        ].map((item) => (
                            <label key={item.name} className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-slate-900">{item.name}</p>
                                    <p className="text-xs text-slate-500">{item.desc}</p>
                                </div>
                                <div className="relative">
                                    <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-light-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-light-blue-600"></div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Appearance */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                            <Palette size={20} className="text-purple-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-slate-900">Appearance</h3>
                            <p className="text-xs text-slate-500">Customize look & feel</p>
                        </div>
                    </div>
                    <div className="p-4">
                        <p className="text-sm font-medium text-slate-700 mb-3">Theme</p>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-light-blue-50 border-2 border-light-blue-500 rounded-xl text-light-blue-700 font-medium">
                                <Check size={16} />
                                Light
                            </button>
                            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-600">
                                Dark
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Save Button - Sticky on Mobile */}
            <div className="sticky bottom-4 sm:static">
                <button className="w-full sm:w-auto px-6 py-3 bg-light-blue-600 hover:bg-light-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-light-blue-200 transition-colors">
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default Settings;
