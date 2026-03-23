import {
    LayoutDashboard,
    FolderOpen,
    Receipt,
    Settings,
    TrendingUp,
    Coins,
    ChartColumn,
    Star,
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
            url: '#',
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
            url: '#',
            icon: <TrendingUp />,
        },
        {
            title: 'Crypto',
            url: '#',
            icon: <Coins />,
        },
        {
            title: 'ETFs',
            url: '#',
            icon: <ChartColumn />,
        },
        {
            title: 'Collectibles',
            url: '#',
            icon: <Star />,
        },
    ],
};
