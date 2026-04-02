import { getTransactionsAction } from '@/actions/transaction';
import { BarChart3 } from 'lucide-react';

const ASSET_STYLES = {
    STOCK: {
        label: 'Stocks',
        bar: 'bg-[#c8a860]',
    },
    ETF: {
        label: 'ETFs',
        bar: 'bg-[#7ea8e8]',
    },
    CRYPTO: {
        label: 'Crypto',
        bar: 'bg-[#b07ae8]',
    },
    OTHER: {
        label: 'Other',
        bar: 'bg-muted-foreground/30',
    },
};

export default async function AssetAllocation() {
    const transactions = await getTransactionsAction();

    const allocation = transactions
        .filter((t) => t.type === 'BUY')
        .reduce(
            (acc, t) => {
                const value = Number(t.total) || 0;

                switch (t.asset.type) {
                    case 'STOCK':
                        acc.STOCK += value;
                        break;
                    case 'ETF':
                        acc.ETF += value;
                        break;
                    case 'CRYPTO':
                        acc.CRYPTO += value;
                        break;
                    default:
                        acc.OTHER += value;
                }

                acc.TOTAL += value;

                return acc;
            },
            {
                STOCK: 0,
                ETF: 0,
                CRYPTO: 0,
                OTHER: 0,
                TOTAL: 0,
            },
        );

    const pct = {
        STOCK: allocation.TOTAL
            ? (allocation.STOCK / allocation.TOTAL) * 100
            : 0,
        ETF: allocation.TOTAL ? (allocation.ETF / allocation.TOTAL) * 100 : 0,
        CRYPTO: allocation.TOTAL
            ? (allocation.CRYPTO / allocation.TOTAL) * 100
            : 0,
        OTHER: allocation.TOTAL
            ? (allocation.OTHER / allocation.TOTAL) * 100
            : 0,
    };

    const items = [
        { key: 'STOCK', pct: pct.STOCK },
        { key: 'ETF', pct: pct.ETF },
        { key: 'CRYPTO', pct: pct.CRYPTO },
        { key: 'OTHER', pct: pct.OTHER },
    ].sort((a, b) => b.pct - a.pct);

    return (
        <div className='flex flex-col rounded-xl border border-border/50 bg-card p-5'>
            <div className='flex items-center justify-between'>
                <p className='text-[10px] font-normal uppercase tracking-[0.08em] text-muted-foreground'>
                    Asset allocation
                </p>
                <div className='flex size-8 items-center justify-center rounded-lg bg-accent'>
                    <BarChart3 className='size-4 text-primary/40' />
                </div>
            </div>

            <div className='mt-5 flex flex-1 flex-col justify-center gap-3'>
                {items.map((item) => {
                    const style = ASSET_STYLES[item.key];

                    return (
                        <div key={item.key} className='flex items-center gap-3'>
                            {/* label neutralny */}
                            <span className='w-14 text-[11px] text-muted-foreground'>
                                {style.label}
                            </span>

                            {/* bar */}
                            <div className='h-1 flex-1 overflow-hidden rounded-full bg-border/60'>
                                <div
                                    className={`h-full rounded-full ${style.bar}`}
                                    style={{ width: `${item.pct}%` }}
                                />
                            </div>

                            {/* procent */}
                            <span className='w-10 text-right text-[11px] text-muted-foreground/40'>
                                {item.pct > 0
                                    ? `${item.pct.toFixed(0)}%`
                                    : '0%'}
                            </span>
                        </div>
                    );
                })}
            </div>

            <p className='mt-4 border-t border-border/50 pt-3 text-[10px] text-muted-foreground/50'>
                {allocation.TOTAL === 0
                    ? 'Add assets to see allocation'
                    : 'Based on BUY transactions'}
            </p>
        </div>
    );
}
