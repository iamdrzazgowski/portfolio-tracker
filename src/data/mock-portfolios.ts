import { Portfolio } from '@/types/portfolio';

export const portfolios: Portfolio[] = [
    {
        id: 1,
        name: 'Long-term Investments',
        description: 'Blue chip stocks and ETFs for retirement',
        totalValue: 45280,
        totalInvested: 38500,
        change: 17.61,
        assets: 12,
        lastUpdated: '2 hours ago',
    },
    {
        id: 2,
        name: 'Crypto Portfolio',
        description: 'Bitcoin, Ethereum and altcoins',
        totalValue: 18450,
        totalInvested: 15000,
        change: 23.0,
        assets: 8,
        lastUpdated: '1 hour ago',
    },
    {
        id: 3,
        name: 'Pokemon Cards',
        description: 'Vintage and graded collectible cards',
        totalValue: 8720,
        totalInvested: 6200,
        change: 40.65,
        assets: 24,
        lastUpdated: '3 days ago',
    },
    {
        id: 4,
        name: 'Short-term Trading',
        description: 'Active trading positions',
        totalValue: 5840,
        totalInvested: 6500,
        change: -10.15,
        assets: 5,
        lastUpdated: '30 min ago',
    },
];
