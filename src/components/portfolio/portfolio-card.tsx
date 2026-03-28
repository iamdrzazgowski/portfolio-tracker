'use client';

import {
    FolderOpen,
    MoreHorizontal,
    Pencil,
    Trash2,
    ChevronRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatNumber } from '@/lib/format';
import { Portfolio } from '@/types/portfolio';
import Link from 'next/link';

interface PortfolioCardProps {
    portfolio: Portfolio;
    onEdit: (portfolio: Portfolio) => void;
    onDelete: (portfolio: Portfolio) => void;
}

export function PortfolioCard({
    portfolio,
    onEdit,
    onDelete,
}: PortfolioCardProps) {
    const isPositive = portfolio.change >= 0;

    const date = new Date(portfolio.lastUpdated);
    const formattedDate = date.toLocaleString('pl-PL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <Card className='group border border-border/50 bg-card shadow-none transition-colors hover:border-primary/30'>
            <CardHeader className='pb-3'>
                <div className='flex items-start justify-between'>
                    <div className='flex items-center gap-3'>
                        <div className='flex size-9 items-center justify-center rounded-lg bg-accent'>
                            <FolderOpen className='size-4 text-primary' />
                        </div>
                        <div>
                            <p className='text-sm font-medium leading-tight text-foreground'>
                                {portfolio.name}
                            </p>
                            <p className='mt-0.5 text-[10px] uppercase tracking-[0.08em] text-muted-foreground'>
                                {portfolio.assets}{' '}
                                {portfolio.assets === 1 ? 'asset' : 'assets'}
                            </p>
                        </div>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant='ghost'
                                size='icon'
                                className='size-7 opacity-0 transition-opacity group-hover:opacity-100'>
                                <MoreHorizontal className='size-3.5' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' className='text-xs'>
                            <DropdownMenuItem
                                className='text-xs'
                                onClick={() => onEdit(portfolio)}>
                                <Pencil className='mr-2 size-3.5' />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className='text-xs text-destructive focus:text-destructive'
                                onClick={() => onDelete(portfolio)}>
                                <Trash2 className='mr-2 size-3.5' />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>

            <CardContent className='pt-0'>
                {portfolio.description && (
                    <p className='mb-3 text-xs leading-relaxed text-muted-foreground line-clamp-2'>
                        {portfolio.description}
                    </p>
                )}

                <div className='border-t border-border/50 pt-3'>
                    <div className='flex items-end justify-between'>
                        <div>
                            <p className='font-serif text-[22px] font-medium leading-none tracking-tight'>
                                ${formatNumber(portfolio.totalValue)}
                            </p>
                            <div className='mt-1.5 flex items-center gap-1.5'>
                                <span
                                    className={`inline-block size-1.5 rounded-full ${isPositive ? 'bg-success' : 'bg-destructive'}`}
                                />
                                <span
                                    className={`text-[11px] font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
                                    {isPositive ? '+' : ''}
                                    {portfolio.change.toFixed(2)}%
                                </span>
                                <span className='text-[10px] text-muted-foreground'>
                                    · {formattedDate}
                                </span>
                            </div>
                        </div>

                        <Link href={`/dashboard/portfolio/${portfolio.id}`}>
                            <Button
                                variant='ghost'
                                size='sm'
                                className='h-7 gap-0.5 text-xs text-muted-foreground hover:text-foreground'>
                                View
                                <ChevronRight className='size-3' />
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
