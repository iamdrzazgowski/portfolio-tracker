'use client';

import { ReactNode } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface DashboardPageHeaderProps {
    title: string;
    description?: string;
    children?: ReactNode;
}

export function DashboardPageHeader({
    title,
    description,
    children,
}: DashboardPageHeaderProps) {
    return (
        <header className='flex min-h-16 items-center justify-between gap-4 px-4'>
            <div className='flex items-start gap-2'>
                <SidebarTrigger className='-ml-1 text-foreground' />
                <div>
                    <h1 className='text-2xl font-semibold tracking-tight'>
                        {title}
                    </h1>
                    {description ? (
                        <p className='text-sm text-muted-foreground'>
                            {description}
                        </p>
                    ) : null}
                </div>
            </div>
            {children ? (
                <div className='flex items-center gap-2'>{children}</div>
            ) : null}
        </header>
    );
}
