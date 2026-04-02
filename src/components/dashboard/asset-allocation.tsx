import { getUserAssetsAction } from '@/actions/assets';
import { BarChart3 } from 'lucide-react';

export default async function AssetAllocation() {
    const assets = await getUserAssetsAction();
    console.log(assets);

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
                {[
                    {
                        label: 'Stocks',
                        pct: 0,
                        color: 'bg-chart-1',
                    },
                    { label: 'ETFs', pct: 0, color: 'bg-chart-2' },
                    {
                        label: 'Crypto',
                        pct: 0,
                        color: 'bg-chart-3',
                    },
                    { label: 'Other', pct: 0, color: 'bg-chart-4' },
                ].map((item) => (
                    <div key={item.label} className='flex items-center gap-3'>
                        <span className='w-14 text-[11px] text-muted-foreground'>
                            {item.label}
                        </span>
                        <div className='h-1 flex-1 overflow-hidden rounded-full bg-border/60'>
                            <div
                                className={`h-full rounded-full ${item.color} opacity-30`}
                                style={{ width: '0%' }}
                            />
                        </div>
                        <span className='w-6 text-right text-[11px] text-muted-foreground/40'>
                            —
                        </span>
                    </div>
                ))}
            </div>
            <p className='mt-4 border-t border-border/50 pt-3 text-[10px] text-muted-foreground/50'>
                Add assets to see allocation
            </p>
        </div>
    );
}
