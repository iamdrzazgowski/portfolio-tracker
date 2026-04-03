import { TrendingDown } from 'lucide-react';

export default function EmptyRecentActivity() {
    return (
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
    );
}
