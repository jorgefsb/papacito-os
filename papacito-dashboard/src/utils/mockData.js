import { faker } from '@faker-js/faker';

// Seed for consistent "random" data
faker.seed(1234); // New seed for freshness

export const VIEW_MODES = {
    GLOBAL: 'Papacito OS',
    AMBER: 'Amber Studio',
    SPARKPLUG: 'Sparkplug',
    PERSONAL: 'Personal Brand'
};

const generateKPIs = (mode) => {
    if (mode === VIEW_MODES.AMBER) {
        return {
            metric1: { label: 'Runway', value: `${faker.number.int({ min: 12, max: 24 })} mo`, trend: 'stable' },
            metric2: { label: 'MRR', value: `$${faker.number.int({ min: 450, max: 600 })}k`, trend: 'up' },
            metric3: { label: 'Headcount', value: faker.number.int({ min: 900, max: 1100 }), trend: 'up' },
            metric4: { label: 'EBITDA', value: `${faker.number.int({ min: 18, max: 25 })}%`, trend: 'stable' }
        };
    } else if (mode === VIEW_MODES.SPARKPLUG) {
        return {
            metric1: { label: 'Runway', value: `${faker.number.int({ min: 6, max: 14 })} mo`, trend: 'down' },
            metric2: { label: 'MRR', value: `$${faker.number.int({ min: 15, max: 45 })}k`, trend: 'up' },
            metric3: { label: 'Active Users', value: faker.number.int({ min: 150, max: 500 }), trend: 'up' },
            metric4: { label: 'Churn', value: `${faker.number.float({ min: 2, max: 5, precision: 0.1 })}%`, trend: 'down' }
        };
    } else if (mode === VIEW_MODES.PERSONAL) {
        return {
            metric1: { label: 'Followers', value: `${faker.number.float({ min: 25, max: 35, precision: 0.1 })}k`, trend: 'up' },
            metric2: { label: 'Engagement', value: `${faker.number.float({ min: 3, max: 8, precision: 0.1 })}%`, trend: 'up' },
            metric3: { label: 'Posts/Wk', value: '4', trend: 'stable' },
            metric4: { label: 'Leads', value: faker.number.int({ min: 5, max: 15 }), trend: 'up' }
        };
    } else {
        // GLOBAL AGGREGATION
        return {
            metric1: { label: 'Net Worth', value: '$2.4M', trend: 'up' },
            metric2: { label: 'Total MRR', value: '$560k', trend: 'up' },
            metric3: { label: 'Active Agents', value: '11/11', trend: 'stable' },
            metric4: { label: 'System Health', value: '98%', trend: 'stable' }
        };
    }
};

export const MOCK_DATA = {
    [VIEW_MODES.GLOBAL]: {
        kpis: generateKPIs(VIEW_MODES.GLOBAL),
        mainChart: Array.from({ length: 12 }, () => ({
            month: faker.date.month({ abbreviated: true }),
            value: faker.number.int({ min: 500, max: 700 }), // Total ecosystem value
        })),
        speed: Array.from({ length: 20 }, () => ({ level: faker.number.int({ min: 2, max: 4 }) }))
    },
    [VIEW_MODES.AMBER]: {
        kpis: generateKPIs(VIEW_MODES.AMBER),
        mainChart: Array.from({ length: 12 }, () => ({
            month: faker.date.month({ abbreviated: true }),
            value: faker.number.int({ min: 400, max: 600 }),
            oppCost: faker.number.int({ min: 20, max: 50 })
        })),
        speed: Array.from({ length: 20 }, () => ({ level: faker.number.int({ min: 1, max: 4 }) }))
    },
    [VIEW_MODES.SPARKPLUG]: {
        kpis: generateKPIs(VIEW_MODES.SPARKPLUG),
        mainChart: Array.from({ length: 12 }, () => ({
            month: faker.date.month({ abbreviated: true }),
            value: faker.number.int({ min: 10, max: 50 }),
            oppCost: faker.number.int({ min: 5, max: 15 })
        })),
        speed: Array.from({ length: 20 }, () => ({ level: faker.number.int({ min: 0, max: 3 }) }))
    },
    [VIEW_MODES.PERSONAL]: {
        kpis: generateKPIs(VIEW_MODES.PERSONAL),
        mainChart: Array.from({ length: 12 }, () => ({
            month: faker.date.month({ abbreviated: true }),
            value: faker.number.int({ min: 2000, max: 50000 }), // Impressions
        })),
        speed: Array.from({ length: 20 }, () => ({ level: faker.number.int({ min: 2, max: 4 }) }))
    }
};

export const AGENTS = [
    { name: 'GM Co-Pilot', role: 'Business', status: 'Reviewing consolidated reports', activeIn: [VIEW_MODES.GLOBAL, VIEW_MODES.AMBER] },
    { name: 'BD Hunter', role: 'Sales', status: 'Prospecting for Sparkplug...', activeIn: [VIEW_MODES.SPARKPLUG] },
    { name: 'PM Brandcade', role: 'Product', status: 'Defining milestone scope', activeIn: [VIEW_MODES.AMBER] },
    { name: 'COO Digital', role: 'Ops', status: 'Optimizing resource allocation', activeIn: [VIEW_MODES.AMBER, VIEW_MODES.GLOBAL] },
    { name: 'Content Strategist', role: 'Content', status: 'Drafting LinkedIn post', activeIn: [VIEW_MODES.PERSONAL] },
    { name: 'Research Analyst', role: 'Support', status: 'Competitor analysis: Bitrix', activeIn: [VIEW_MODES.SPARKPLUG, VIEW_MODES.GLOBAL] },
];
