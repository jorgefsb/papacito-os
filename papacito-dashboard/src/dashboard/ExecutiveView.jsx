import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import WidgetCard from '../components/widgets/WidgetCard';
import { MOCK_DATA, AGENTS, VIEW_MODES } from '../utils/mockData.js';
import { ArrowUp, ArrowDown, Users, Activity, DollarSign, Clock, LayoutGrid, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts';

export default function ExecutiveView() {
    const [company, setCompany] = useState(VIEW_MODES.GLOBAL);
    const data = MOCK_DATA[company] || MOCK_DATA[VIEW_MODES.GLOBAL];
    const isGlobal = company === VIEW_MODES.GLOBAL;

    // Filter Agents based on context (Global sees all, Entity sees only theirs)
    const filteredAgents = AGENTS.filter(a => isGlobal || a.activeIn?.includes(company));

    return (
        <div className="flex bg-os-gray-50 min-h-screen">
            <Sidebar company={company} setCompany={setCompany} />

            <main className="flex-1 ml-64 p-8 transition-all duration-500">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        {isGlobal && <span className="text-xs font-bold text-os-blue-DEFAULT uppercase tracking-widest mb-1 block">System Overview</span>}
                        <h1 className="text-2xl font-bold text-os-gray-900 font-sans tracking-tight">{company}</h1>
                        <p className="text-sm text-os-gray-200 mt-1">
                            {isGlobal ? 'Consolidated view of all entities' : `Specific dashboard for ${company}`}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <span className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-os-gray-800 border border-os-gray-200 shadow-sm flex items-center">
                            <span className="w-2 h-2 rounded-full bg-os-green-DEFAULT mr-2 animate-pulse"></span>
                            System Operational
                        </span>
                    </div>
                </header>

                {/* 1. Dynamic KPI Ribbon */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <KPICard label={data.kpis.metric1.label} value={data.kpis.metric1.value} icon={Clock} trend={data.kpis.metric1.trend} />
                    <KPICard label={data.kpis.metric2.label} value={data.kpis.metric2.value} icon={DollarSign} trend={data.kpis.metric2.trend} />
                    <KPICard label={data.kpis.metric3.label} value={data.kpis.metric3.value} icon={Users} trend={data.kpis.metric3.trend} />
                    <KPICard label={data.kpis.metric4.label} value={data.kpis.metric4.value} icon={Activity} trend={data.kpis.metric4.trend} />
                </div>

                {/* 2. Main Grid Layout */}
                <div className="grid grid-cols-12 gap-6">

                    {/* Global View specific: Entity Status Cards */}
                    {isGlobal && (
                        <div className="col-span-12 grid grid-cols-3 gap-6 mb-2">
                            <EntityStatusCard name="Amber Studio" health="95%" agents="3 Active" trend="up" />
                            <EntityStatusCard name="Sparkplug" health="88%" agents="2 Active" trend="down" />
                            <EntityStatusCard name="Personal Brand" health="92%" agents="1 Active" trend="up" />
                        </div>
                    )}

                    {/* Financial Health Chart */}
                    <div className={isGlobal ? "col-span-8" : "col-span-8"}>
                        <WidgetCard title={isGlobal ? "Total Ecosystem Value" : "Cash Flow vs Opp. Cost"} className="h-96" actionIcon>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data.mainChart}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2FC7F7" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#2FC7F7" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="value" stroke="#2FC7F7" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                                    {data.mainChart[0].oppCost && <Area type="monotone" dataKey="oppCost" stroke="#FF6B6B" strokeWidth={2} fillOpacity={0} fill="transparent" strokeDasharray="5 5" />}
                                </AreaChart>
                            </ResponsiveContainer>
                        </WidgetCard>
                    </div>

                    {/* Agent Activity Tracker - Filtered by Context */}
                    <div className="col-span-4">
                        <WidgetCard title={isGlobal ? "All Active Agents" : "Allocated Agents"} className="h-96">
                            <div className="space-y-4 overflow-y-auto h-full pr-2 custom-scrollbar">
                                {filteredAgents.length > 0 ? filteredAgents.map((agent, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-os-gray-50 transition-colors border border-transparent hover:border-os-gray-100 cursor-pointer">
                                        <div className="w-8 h-8 rounded-full bg-os-gray-100 flex items-center justify-center text-xs font-bold text-os-blue-dark">
                                            {agent.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-os-gray-900">{agent.name}</p>
                                            <p className="text-xs text-os-gray-800 mt-0.5">{agent.status}</p>
                                            <span className="inline-block mt-2 text-[10px] uppercase tracking-wider text-os-gray-200 font-bold bg-white border border-os-gray-200 px-1.5 py-0.5 rounded">
                                                {agent.role}
                                            </span>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="flex flex-col items-center justify-center h-full text-os-gray-200 text-sm">
                                        <Users className="w-8 h-8 mb-2 opacity-20" />
                                        No agents active in this context.
                                    </div>
                                )}
                            </div>
                        </WidgetCard>
                    </div>

                    {/* Operational Speed Heatmap */}
                    <div className="col-span-6">
                        <WidgetCard title="Operational Speed" className="h-64">
                            <div className="flex flex-wrap gap-2 h-full content-center justify-center">
                                {data.speed.map((s, i) => (
                                    <div
                                        key={i}
                                        className={`w-8 h-8 rounded-md transition-all duration-500 hover:scale-110 ${s.level === 0 ? 'bg-os-gray-100' :
                                                s.level === 1 ? 'bg-os-blue-light' :
                                                    s.level === 2 ? 'bg-os-blue-DEFAULT' :
                                                        'bg-os-blue-dark'
                                            }`}
                                        title={`Speed Level: ${s.level}`}
                                    ></div>
                                ))}
                            </div>
                        </WidgetCard>
                    </div>

                    {/* Contextual Alerts */}
                    <div className="col-span-6">
                        <WidgetCard title="Priority Alerts" className="h-64">
                            <div className="space-y-2">
                                {(isGlobal || company === VIEW_MODES.AMBER) && (
                                    <div className="bg-red-50 border-l-4 border-red-500 p-3 text-sm text-red-700">
                                        <strong>Amber Studio:</strong> Project Alpha is delayed by 15%.
                                    </div>
                                )}
                                {(isGlobal || company === VIEW_MODES.SPARKPLUG) && (
                                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 text-sm text-yellow-700">
                                        <strong>Sparkplug:</strong> Churn risk detected for Client X.
                                    </div>
                                )}
                                <div className="bg-blue-50 border-l-4 border-blue-500 p-3 text-sm text-blue-700">
                                    <strong>System:</strong> Weekly backup completed successfully.
                                </div>
                            </div>
                        </WidgetCard>
                    </div>

                </div>
            </main>
        </div>
    );
}

function KPICard({ label, value, icon: Icon, trend }) {
    return (
        <div className="bg-white p-4 rounded-lg border border-os-gray-200 shadow-card flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-200">
            <div className="flex justify-between items-start mb-2">
                <Icon className="w-5 h-5 text-os-gray-200" />
                {trend === 'up' && <ArrowUp className="w-4 h-4 text-green-500" />}
                {trend === 'down' && <ArrowDown className="w-4 h-4 text-red-500" />}
                {trend === 'stable' && <span className="text-gray-400 text-xs font-bold">=</span>}
            </div>
            <div>
                <span className="text-xs text-os-gray-200 uppercase font-bold tracking-wide">{label}</span>
                <div className="text-2xl font-bold text-os-gray-900 mt-1">{value}</div>
            </div>
        </div>
    )
}

function EntityStatusCard({ name, health, agents, trend }) {
    return (
        <div className="bg-white p-4 rounded-lg border border-os-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-os-blue-light flex items-center justify-center text-os-blue-dark">
                    <LayoutGrid className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-bold text-sm text-os-gray-900">{name}</h4>
                    <p className="text-xs text-os-gray-200">{agents}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-lg font-bold text-os-gray-900">{health}</p>
                <div className="flex items-center gap-1 justify-end">
                    {trend === 'up' ? <ArrowUp className="w-3 h-3 text-green-500" /> : <ArrowDown className="w-3 h-3 text-red-500" />}
                </div>
            </div>
        </div>
    )
}
