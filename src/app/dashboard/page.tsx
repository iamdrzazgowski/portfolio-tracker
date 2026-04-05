import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { DashboardPageHeader } from '@/components/layout/dashboard-page-header';
import { KpiCards } from '@/components/dashboard/kpi-cards';
import { getPortfolioKpis } from '@/actions/getPortfolioKpis';
import AssetAllocation from '@/components/dashboard/asset-allocation';
import RecentActivity from '@/components/dashboard/recent-activity';
import { getUserSnapshotsAction } from '@/actions/snapshot';
import PortfolioChart from '@/components/dashboard/portfolio-chart';

export default async function Home() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        redirect('/login');
    }

    const initialKpis = await getPortfolioKpis();
    const userSnapshots = await getUserSnapshotsAction();
    console.log(userSnapshots);

    return (
        <>
            <DashboardPageHeader
                title='Dashboard'
                description='Track and manage your investments in one place.'
            />

            <div className='flex flex-1 flex-col gap-6 p-5 pt-6'>
                <KpiCards initial={initialKpis} />

                <div className='grid gap-4 lg:grid-cols-[1fr_340px]'>
                    <PortfolioChart
                        data={userSnapshots ?? []}
                        monthsToShow={6}
                    />

                    <AssetAllocation />
                </div>
                <RecentActivity />
            </div>
        </>
    );
}
