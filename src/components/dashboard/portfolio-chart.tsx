'use client';

import { TrendingUp } from 'lucide-react';
import { subMonths, format } from 'date-fns';

export default function PortfolioChart({ data, monthsToShow = 6 }) {
    const safeData = Array.isArray(data) ? data : data ? [data] : [];

    // --- Generujemy ostatnie X miesięcy i wypełniamy brakujące 0
    const months: { label: string; key: string }[] = [];
    const monthMap: Record<string, { value: number; dateStr: string }> = {};

    for (let i = monthsToShow - 1; i >= 0; i--) {
        const d = subMonths(new Date(), i);
        const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
        months.push({ label: format(d, 'MMM'), key });
        monthMap[key] = { value: 0, dateStr: format(d, 'MMM yyyy') }; // placeholder
    }

    // --- Wypełniamy dane z bazy, używając UTC
    safeData.forEach((item) => {
        const d = new Date(item.date);
        const year = d.getUTCFullYear();
        const month = d.getUTCMonth() + 1; // 0-based → 1-based
        const key = `${year}-${String(month).padStart(2, '0')}`;
        if (monthMap[key]) {
            monthMap[key] = {
                value: item.totalValue ?? 0,
                dateStr: format(
                    new Date(Date.UTC(year, d.getUTCMonth(), d.getUTCDate())),
                    'MMM yyyy',
                ),
            };
        }
    });

    const values = months.map((m) => monthMap[m.key].value);
    const maxValue = Math.max(...values, 1);

    return (
        <div className='flex min-h-[220px] flex-col rounded-xl border border-border/50 bg-card p-5'>
            {/* HEADER */}
            <div className='flex items-center justify-between'>
                <div>
                    <p className='text-[10px] font-normal uppercase tracking-[0.08em] text-muted-foreground'>
                        Portfolio value
                    </p>
                    <p className='mt-0.5 text-sm font-medium text-muted-foreground/40'>
                        Last {monthsToShow} months
                    </p>
                </div>
                <div className='flex size-8 items-center justify-center rounded-lg bg-accent'>
                    <TrendingUp className='size-4 text-primary/40' />
                </div>
            </div>

            {/* MINIMALISTYCZNY WYKRES */}
            <div className='mt-4 flex flex-1 items-end gap-1.5'>
                {months.map((m, i) => {
                    const val = monthMap[m.key].value;
                    const height = (val / maxValue) * 100;
                    const tooltip = `${monthMap[m.key].dateStr}: ${val.toFixed(2)}$`;
                    return (
                        <div
                            key={i}
                            className='flex-1 rounded-sm bg-chart-2 transition-all duration-500 hover:bg-chart-1'
                            style={{ height: `${height}%` }}
                            title={tooltip}
                        />
                    );
                })}
            </div>

            {/* LABELKI */}
            <div className='mt-3 flex justify-between border-t border-border/50 pt-2'>
                {months.map((m, i) => (
                    <span
                        key={i}
                        className='text-[10px] text-muted-foreground/50'>
                        {m.label}
                    </span>
                ))}
            </div>
        </div>
    );
}
