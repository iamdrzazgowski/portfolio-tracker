import { DashboardPageHeader } from '@/components/layout/dashboard-page-header';

export default async function Page({
    params,
}: {
    params: Promise<{ portfolioId: string }>;
}) {
    const { portfolioId } = await params;

    return (
        <>
            <DashboardPageHeader title='Portfolio details' />
            <div>{portfolioId}</div>
        </>
    );
}
