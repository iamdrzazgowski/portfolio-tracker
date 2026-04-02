'use client';

import { useState, useTransition } from 'react';
import { RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';
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

    const plPositive = kpis ? kpis.totalPL >= 0 : null;
    const plPercent =
        kpis && kpis.totalInvested > 0
            ? (kpis.totalPL / kpis.totalInvested) * 100
            : null;

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
                <div
                    className={`rounded-xl border p-4 transition-opacity duration-300 ${
                        isPending ? 'opacity-50' : 'opacity-100'
                    } border-primary/40 bg-accent`}>
                    <p className='text-[10px] font-normal uppercase tracking-[0.08em] text-muted-foreground'>
                        Total Value
                    </p>
                    <p className='mt-1.5 font-serif text-[22px] font-medium leading-none text-primary'>
                        {kpis ? fmt(kpis.totalValue) : '—'}
                    </p>
                    <p className='mt-2.5 text-[11px] text-muted-foreground/50'>
                        {lastUpdated
                            ? `Updated ${lastUpdated.toLocaleTimeString()}`
                            : 'Click Refresh to update'}
                    </p>
                </div>

                <div
                    className={`rounded-xl border p-4 transition-opacity duration-300 ${
                        isPending ? 'opacity-50' : 'opacity-100'
                    } border-border/50 bg-card`}>
                    <p className='text-[10px] font-normal uppercase tracking-[0.08em] text-muted-foreground'>
                        Total Invested
                    </p>
                    <p className='mt-1.5 font-serif text-[22px] font-medium leading-none text-foreground'>
                        {kpis ? fmt(kpis.totalInvested) : '—'}
                    </p>
                    <p className='mt-2.5 text-[11px] text-muted-foreground/50'>
                        {kpis ? 'Capital deployed' : 'No data yet'}
                    </p>
                </div>

                <div
                    className={`rounded-xl border p-4 transition-opacity duration-300 ${
                        isPending ? 'opacity-50' : 'opacity-100'
                    } border-border/50 bg-card`}>
                    <p className='text-[10px] font-normal uppercase tracking-[0.08em] text-muted-foreground'>
                        Total P/L
                    </p>
                    <p
                        className={`mt-1.5 font-serif text-[22px] font-medium leading-none ${
                            kpis === null
                                ? 'text-muted-foreground/30'
                                : plPositive
                                  ? 'text-success'
                                  : 'text-destructive'
                        }`}>
                        {kpis
                            ? `${plPositive ? '+' : ''}${fmt(kpis.totalPL)}`
                            : '—'}
                    </p>
                    {kpis && plPercent !== null ? (
                        <div className='mt-2.5 flex items-center gap-1'>
                            {plPositive ? (
                                <TrendingUp className='size-3 text-success' />
                            ) : (
                                <TrendingDown className='size-3 text-destructive' />
                            )}
                            <span
                                className={`text-[11px] font-medium ${
                                    plPositive
                                        ? 'text-success'
                                        : 'text-destructive'
                                }`}>
                                {plPositive ? '+' : ''}
                                {plPercent.toFixed(2)}%
                            </span>
                            <span className='text-[10px] text-muted-foreground/50'>
                                all time
                            </span>
                        </div>
                    ) : (
                        <p className='mt-2.5 text-[11px] text-muted-foreground/50'>
                            No data yet
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
