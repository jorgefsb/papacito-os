import React from 'react';
import clsx from 'clsx';
import {
    Building2,
    Zap,
    LayoutDashboard,
    MessageSquare,
    Users,
    Settings,
    PieChart,
    User,
    Globe
} from 'lucide-react';
import { VIEW_MODES } from '../../utils/mockData';

const MENU_ITEMS = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: MessageSquare, label: 'Feed' },
    { icon: Users, label: 'Agents' },
    { icon: PieChart, label: 'Reports' },
    { icon: Settings, label: 'Settings' },
];

export default function Sidebar({ company, setCompany }) {
    return (
        <aside className="w-64 bg-white border-r border-os-gray-200 h-screen flex flex-col fixed left-0 top-0 z-50">
            {/* Brand Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-os-gray-100">
                <div className="w-8 h-8 bg-os-blue-DEFAULT rounded-full flex items-center justify-center text-white font-bold mr-3">P</div>
                <span className="font-sans font-bold text-lg tracking-tight text-os-gray-800">Papacito OS </span>
            </div>

            <div className="p-4 space-y-4">

                {/* GLOBAL VIEW */}
                <div>
                    <h4 className="text-xs font-bold text-os-gray-200 uppercase mb-2 px-2">Global Command</h4>
                    <button
                        onClick={() => setCompany(VIEW_MODES.GLOBAL)}
                        className={clsx(
                            "w-full flex items-center px-3 py-2 rounded-md text-sm font-bold transition-colors mb-1",
                            company === VIEW_MODES.GLOBAL
                                ? "bg-os-blue-dark text-white shadow-lg shadow-os-blue-DEFAULT/30"
                                : "text-os-gray-800 hover:bg-os-gray-50 border border-os-gray-200"
                        )}
                    >
                        <Globe className="w-4 h-4 mr-3" />
                        Papacito OS
                    </button>
                </div>

                {/* ENTITIES */}
                <div>
                    <h4 className="text-xs font-bold text-os-gray-200 uppercase mb-2 px-2">Entities</h4>
                    <div className="space-y-1">
                        <button
                            onClick={() => setCompany(VIEW_MODES.AMBER)}
                            className={clsx(
                                "w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                company === VIEW_MODES.AMBER
                                    ? "bg-os-blue-light text-os-blue-dark border border-os-blue-DEFAULT/20"
                                    : "text-os-gray-800 hover:bg-os-gray-50"
                            )}
                        >
                            <Building2 className="w-4 h-4 mr-3" />
                            Amber Studio
                        </button>
                        <button
                            onClick={() => setCompany(VIEW_MODES.SPARKPLUG)}
                            className={clsx(
                                "w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                company === VIEW_MODES.SPARKPLUG
                                    ? "bg-os-blue-light text-os-blue-dark border border-os-blue-DEFAULT/20"
                                    : "text-os-gray-800 hover:bg-os-gray-50"
                            )}
                        >
                            <Zap className="w-4 h-4 mr-3 fill-current" />
                            Sparkplug
                        </button>
                        <button
                            onClick={() => setCompany(VIEW_MODES.PERSONAL)}
                            className={clsx(
                                "w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                company === VIEW_MODES.PERSONAL
                                    ? "bg-os-blue-light text-os-blue-dark border border-os-blue-DEFAULT/20"
                                    : "text-os-gray-800 hover:bg-os-gray-50"
                            )}
                        >
                            <User className="w-4 h-4 mr-3" />
                            Personal Brand
                        </button>
                    </div>
                </div>
            </div>

            <div className="border-t border-os-gray-100 my-2 mx-4"></div>

            {/* Main Menu */}
            <nav className="flex-1 px-4 py-2 space-y-1">
                {MENU_ITEMS.map((item, idx) => (
                    <button key={idx} className={clsx(
                        "w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors group",
                        item.active ? "text-os-blue-DEFAULT bg-os-gray-50" : "text-os-gray-800 hover:bg-os-gray-50 hover:text-os-blue-DEFAULT"
                    )}>
                        <item.icon className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-os-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-os-blue-DEFAULT to-os-blue-dark"></div>
                    <div>
                        <p className="text-sm font-semibold">Jorge Suarez</p>
                        <p className="text-xs text-os-gray-200">Admin</p>
                    </div>
                </div>
            </div>

        </aside>
    );
}
