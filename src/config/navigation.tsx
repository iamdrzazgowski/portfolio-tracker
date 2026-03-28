import {
    LayoutDashboard,
    FolderOpen,
    Receipt,
    Settings,
    TrendingUp,
    Coins,
    ChartColumn,
} from 'lucide-react';

export const navigationData = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    navMain: [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: <LayoutDashboard />,
        },
        {
            title: 'Portfolio',
            url: '/dashboard/portfolio',
            icon: <FolderOpen />,
        },
        {
            title: 'Transactions',
            url: '/dashboard/transactions',
            icon: <Receipt />,
        },
    ],
    navSecondary: [
        {
            title: 'Settings',
            url: '#',
            icon: <Settings />,
        },
    ],
    assets: [
        {
            title: 'Stocks',
            url: '/dashboard/stocks',
            icon: <TrendingUp />,
        },
        {
            title: 'Crypto',
            url: '/dashboard/crypto',
            icon: <Coins />,
        },
        {
            title: 'ETFs',
            url: '/dashboard/etfs',
            icon: <ChartColumn />,
        },
    ],
};
