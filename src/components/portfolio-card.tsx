import {
    FolderOpen,
    MoreHorizontal,
    Pencil,
    Trash2,
    ChevronRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatNumber } from '@/lib/utils';
import { Portfolio } from '@/types/portfolio';

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
    return (
        <Card className='group border border-border/50 bg-card transition-all hover:border-primary/30'>
            <CardHeader className='pb-3'>
                <div className='flex items-start justify-between'>
                    <div className='flex items-center gap-3'>
                        <div className='flex size-10 items-center justify-center rounded-lg bg-primary/10'>
                            <FolderOpen className='size-5 text-primary' />
                        </div>
                        <div>
                            <CardTitle className='text-base'>
                                {portfolio.name}
                            </CardTitle>
                            <p className='text-xs text-muted-foreground'>
                                {portfolio.assets} assets
                            </p>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant='ghost'
                                size='icon'
                                className='size-8 opacity-0 group-hover:opacity-100'>
                                <MoreHorizontal className='size-4' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            <DropdownMenuItem onClick={() => onEdit(portfolio)}>
                                <Pencil className='mr-2 size-4' />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className='text-destructive'
                                onClick={() => onDelete(portfolio)}>
                                <Trash2 className='mr-2 size-4' />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className='pt-0'>
                <p className='mb-4 text-sm text-muted-foreground line-clamp-2'>
                    {portfolio.description}
                </p>
                <div className='flex items-end justify-between'>
                    <div>
                        <p className='text-2xl font-semibold'>
                            ${formatNumber(portfolio.totalValue)}
                        </p>
                        <div className='mt-1 flex items-center gap-2'>
                            <Badge
                                variant='secondary'
                                className={
                                    portfolio.change >= 0
                                        ? 'bg-success/10 text-success hover:bg-success/20'
                                        : 'bg-destructive/10 text-destructive hover:bg-destructive/20'
                                }>
                                {portfolio.change >= 0 ? '+' : ''}
                                {portfolio.change.toFixed(2)}%
                            </Badge>
                            <span className='text-xs text-muted-foreground'>
                                Updated {portfolio.lastUpdated}
                            </span>
                        </div>
                    </div>
                    <Button variant='ghost' size='sm' className='gap-1'>
                        View
                        <ChevronRight className='size-4' />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
