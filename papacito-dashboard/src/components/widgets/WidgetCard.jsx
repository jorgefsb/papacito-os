import React from 'react';
import clsx from 'clsx';
import { ArrowUpRight, GripVertical } from 'lucide-react';

export default function WidgetCard({ title, children, className, actionIcon }) {
    return (
        <div className={clsx(
            "bg-white rounded-lg border border-os-gray-200 shadow-card flex flex-col overflow-hidden hover:shadow-os transition-all duration-300",
            className
        )}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-os-gray-100 bg-os-gray-50/50">
                <div className="flex items-center gap-2">
                    <GripVertical className="text-os-gray-200 w-4 h-4 cursor-grab hover:text-os-gray-800" />
                    <h3 className="text-sm font-semibold text-os-gray-800 uppercase tracking-wide font-sans">{title}</h3>
                </div>

                {actionIcon && (
                    <button className="text-os-gray-200 hover:text-os-blue-DEFAULT transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex-1">
                {children}
            </div>
        </div>
    );
}
