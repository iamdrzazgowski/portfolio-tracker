import { TrendingDown, Wallet } from 'lucide-react';
import React from 'react';

export default function RecentActivity() {
    return (
        <div className='rounded-xl border border-border/50 bg-card p-5'>
            <div className='flex items-center justify-between'>
                <div>
                    <p className='text-sm font-medium text-foreground'>
                        Recent Activity
                    </p>
                    <p className='mt-0.5 text-[10px] uppercase tracking-[0.08em] text-muted-foreground'>
                        Latest buy &amp; sell transactions
                    </p>
                </div>
                <div className='flex size-8 items-center justify-center rounded-lg bg-accent'>
                    <Wallet className='size-4 text-primary/40' />
                </div>
            </div>
            <div className='mt-4 flex flex-col items-center justify-center gap-2 py-10 text-center'>
                <TrendingDown className='size-8 text-muted-foreground/20' />
                <p className='text-sm text-muted-foreground/50'>
                    No transactions yet
                </p>
                <p className='text-[11px] text-muted-foreground/40'>
                    Head to{' '}
                    <a
                        href='/dashboard/transactions'
                        className='text-primary/60 underline underline-offset-2 hover:text-primary'>
                        Transactions
                    </a>{' '}
                    to record your first trade.
                </p>
            </div>
        </div>
    );
}
