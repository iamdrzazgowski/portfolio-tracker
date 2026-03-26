'use client';

import { ReactNode } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

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
        <header className='flex min-h-16 flex-col items-start justify-center gap-3 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-0'>
            <div className='flex items-center gap-3'>
                <SidebarTrigger className='-ml-1 text-muted-foreground transition-colors hover:text-foreground' />
                <Separator orientation='vertical' className='h-12 opacity-50' />
                <div>
                    <h1 className='font-serif text-2xl font-light italic tracking-tight text-foreground'>
                        {title}
                    </h1>
                    {description ? (
                        <p className='text-[10px] uppercase tracking-widest text-muted-foreground'>
                            {description}
                        </p>
                    ) : null}
                </div>
            </div>
            {children ? (
                <div className='flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center'>
                    {children}
                </div>
            ) : null}
        </header>
    );
}
