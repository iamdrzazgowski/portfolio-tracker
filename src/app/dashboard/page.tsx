import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { DashboardPageHeader } from '@/components/layout/dashboard-page-header';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { KpiCards } from '@/components/dashboard/kpi-cards';
import { getPortfolioKpis } from '@/actions/getPortfolioKpis';
import AssetAllocation from '@/components/dashboard/asset-allocation';

export default async function Home() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        redirect('/login');
    }

    const initialKpis = await getPortfolioKpis();

    return (
        <>
            <DashboardPageHeader
                title='Dashboard'
                description='Track and manage your investments in one place.'
            />

            <div className='flex flex-1 flex-col gap-6 p-5 pt-6'>
                <KpiCards initial={initialKpis} />

                {/* Chart + Allocation row */}
                <div className='grid gap-4 lg:grid-cols-[1fr_340px]'>
                    {/* Chart placeholder */}
                    <div className='flex min-h-[220px] flex-col rounded-xl border border-border/50 bg-card p-5'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-[10px] font-normal uppercase tracking-[0.08em] text-muted-foreground'>
                                    Portfolio value
                                </p>
                                <p className='mt-0.5 text-sm font-medium text-muted-foreground/40'>
                                    Last 6 months
                                </p>
                            </div>
                            <div className='flex size-8 items-center justify-center rounded-lg bg-accent'>
                                <TrendingUp className='size-4 text-primary/40' />
                            </div>
                        </div>
                        <div className='mt-4 flex flex-1 items-end gap-1.5'>
                            {[40, 55, 45, 70, 60, 80, 75, 90, 85, 100].map(
                                (h, i) => (
                                    <div
                                        key={i}
                                        className='flex-1 rounded-sm bg-primary/10'
                                        style={{ height: `${h}%` }}
                                    />
                                ),
                            )}
                        </div>
                        <div className='mt-3 flex justify-between border-t border-border/50 pt-2'>
                            {['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'].map(
                                (m) => (
                                    <span
                                        key={m}
                                        className='text-[10px] text-muted-foreground/50'>
                                        {m}
                                    </span>
                                ),
                            )}
                        </div>
                    </div>

                    {/* Allocation placeholder */}
                    <AssetAllocation />
                </div>

                {/* Recent activity placeholder */}
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
            </div>
        </>
    );
}
