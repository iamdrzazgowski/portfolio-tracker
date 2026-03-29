'use client';

import { useState, useTransition } from 'react';
import { RefreshCw } from 'lucide-react';
import { refreshPrices } from '@/actions/refreshPrices';
import { getPortfolioKpis } from '@/actions/getPortfolioKpis';
import { Button } from '@/components/ui/button';

type Kpis = {
    totalValue: number;
    totalInvested: number;
    totalPL: number;
};

const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(n);

export function KpiCards({ initial }: { initial: Kpis | null }) {
    const [kpis, setKpis] = useState<Kpis | null>(initial);
    const [isPending, startTransition] = useTransition();
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const refresh = () => {
        startTransition(async () => {
            await refreshPrices();
            const fresh = await getPortfolioKpis();
            if (fresh) {
                setKpis(fresh);
                setLastUpdated(new Date());
            }
        });
    };

    const cards = [
        {
            label: 'Total Value',
            value: kpis ? fmt(kpis.totalValue) : '—',
            accent: true,
        },
        {
            label: 'Total Invested',
            value: kpis ? fmt(kpis.totalInvested) : '—',
            accent: false,
        },
        {
            label: 'Total P/L',
            value: kpis ? fmt(kpis.totalPL) : '—',
            accent: false,
        },
    ];

    return (
        <div className='flex flex-col gap-3'>
            <div className='flex items-center justify-between'>
                <p className='text-[10px] font-normal uppercase tracking-[0.08em] text-muted-foreground'>
                    Overview
                </p>
                <div className='flex items-center gap-2'>
                    {lastUpdated && (
                        <span className='text-[10px] text-muted-foreground/50'>
                            Updated {lastUpdated.toLocaleTimeString()}
                        </span>
                    )}
                    <Button
                        variant='ghost'
                        size='sm'
                        onClick={refresh}
                        disabled={isPending}
                        className='h-7 gap-1.5 text-xs text-muted-foreground'>
                        <RefreshCw
                            className={`size-3 ${isPending ? 'animate-spin' : ''}`}
                        />
                        {isPending ? 'Refreshing…' : 'Refresh'}
                    </Button>
                </div>
            </div>

            <div className='grid gap-3 sm:grid-cols-3'>
                {cards.map((kpi) => (
                    <div
                        key={kpi.label}
                        className={`rounded-xl border p-4 transition-opacity duration-300 ${
                            isPending ? 'opacity-50' : 'opacity-100'
                        } ${
                            kpi.accent
                                ? 'border-primary/40 bg-accent'
                                : 'border-border/50 bg-card'
                        }`}>
                        <p className='text-[10px] font-normal uppercase tracking-[0.08em] text-muted-foreground'>
                            {kpi.label}
                        </p>
                        <p
                            className={`mt-1.5 font-serif text-[22px] font-medium leading-none ${
                                kpi.accent
                                    ? 'text-primary'
                                    : 'text-muted-foreground/30'
                            }`}>
                            {kpi.value}
                        </p>
                        <p className='mt-2.5 text-[11px] text-muted-foreground/50'>
                            {kpis ? 'Live prices' : 'No data yet'}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
