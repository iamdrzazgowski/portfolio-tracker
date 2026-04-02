type AssetType = 'STOCK' | 'ETF' | 'CRYPTO';

const CONFIG: Record<
    AssetType,
    {
        label: string;
        bg: string;
        text: string;
        border: string;
        icon: React.ReactNode;
    }
> = {
    STOCK: {
        label: 'STOCK',
        bg: 'bg-[#f0ece4] dark:bg-[#2a2416]',
        text: 'text-[#5c4a1e] dark:text-[#c8a860]',
        border: 'border-[#d4c8b0] dark:border-[#4a3c20]',
        icon: (
            <svg
                viewBox='0 0 10 10'
                fill='none'
                className='w-[9px] h-[9px] shrink-0'>
                <rect
                    x='1'
                    y='4'
                    width='2'
                    height='5'
                    rx='0.5'
                    fill='currentColor'
                />
                <rect
                    x='4'
                    y='2'
                    width='2'
                    height='7'
                    rx='0.5'
                    fill='currentColor'
                />
                <rect
                    x='7'
                    y='5.5'
                    width='2'
                    height='3.5'
                    rx='0.5'
                    fill='currentColor'
                />
            </svg>
        ),
    },
    ETF: {
        label: 'ETF',
        bg: 'bg-[#e8edf8] dark:bg-[#1a2540]',
        text: 'text-[#2c52a0] dark:text-[#7ea8e8]',
        border: 'border-[#b8c8e8] dark:border-[#2c4080]',
        icon: (
            <svg
                viewBox='0 0 10 10'
                fill='none'
                className='w-[9px] h-[9px] shrink-0'>
                <circle
                    cx='5'
                    cy='5'
                    r='3.5'
                    stroke='currentColor'
                    strokeWidth='1.2'
                />
                <path
                    d='M5 2v3l2 1.2'
                    stroke='currentColor'
                    strokeWidth='1.1'
                    strokeLinecap='round'
                />
            </svg>
        ),
    },
    CRYPTO: {
        label: 'CRYPTO',
        bg: 'bg-[#f0e8f8] dark:bg-[#241a40]',
        text: 'text-[#5a2c8a] dark:text-[#b07ae8]',
        border: 'border-[#c8a8e8] dark:border-[#3c2460]',
        icon: (
            <svg
                viewBox='0 0 10 10'
                fill='none'
                className='w-[9px] h-[9px] shrink-0'>
                <path
                    d='M5 1.5C3.07 1.5 1.5 3.07 1.5 5S3.07 8.5 5 8.5 8.5 6.93 8.5 5 6.93 1.5 5 1.5zm.6 4.6c-.25.18-.6.28-.95.3V7H4.3v-.58c-.2-.01-.4-.05-.55-.1l-.02-.01.18-.65.08.03c.17.06.38.1.58.1.34 0 .54-.13.54-.34 0-.19-.13-.3-.5-.42-.52-.17-.82-.42-.82-.84 0-.36.27-.65.7-.75V3h.35v.44c.17.01.33.05.46.1l.02.01-.17.63-.07-.03c-.14-.05-.3-.09-.47-.09-.32 0-.46.14-.46.3 0 .17.14.28.54.42.54.18.79.44.79.87 0 .38-.26.68-.64.86z'
                    fill='currentColor'
                />
            </svg>
        ),
    },
};

interface AssetTypeBadgeProps {
    type: AssetType | string;
}

export function AssetTypeBadge({ type }: AssetTypeBadgeProps) {
    const config = CONFIG[type];

    return (
        <span
            className={`inline-flex items-center gap-[5px] text-[9px] font-medium uppercase tracking-[0.06em] px-2 py-[3px] rounded-[5px] border font-mono ${config.bg} ${config.text} ${config.border}`}>
            {config.icon}
            {config.label}
        </span>
    );
}
