import { DashboardPageHeader } from '@/components/layout/dashboard-page-header';

export default async function Page({
    params,
}: {
    params: Promise<{ portfolioId: string }>;
}) {
    const { portfolioId } = await params;

    return (
        <>
            <DashboardPageHeader
                title='Portfolio details'
                description='Detailed view of your assets, performance, and allocation.'
            />
            <div>{portfolioId}</div>
        </>
    );
}
