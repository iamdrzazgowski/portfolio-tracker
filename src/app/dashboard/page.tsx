import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { DashboardPageHeader } from '@/components/layout/dashboard-page-header';

export default async function Home() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        redirect('/login');
    }

    return (
        <>
            <DashboardPageHeader
                title='Dashboard'
                description='Track and manage your investments in one place.'
            />
            <div className='flex flex-1 flex-col gap-4 p-4 pt-6'>
                <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
                    <div className='aspect-video rounded-xl bg-muted/50' />
                    <div className='aspect-video rounded-xl bg-muted/50' />
                    <div className='aspect-video rounded-xl bg-muted/50' />
                </div>
                <div className='min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min' />
            </div>
        </>
    );
}
