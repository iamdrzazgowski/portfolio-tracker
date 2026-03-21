'use client';

import { useState } from 'react';
import {
    Plus,
    MoreHorizontal,
    Pencil,
    Trash2,
    FolderOpen,
    TrendingUp,
    TrendingDown,
    ChevronRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { formatNumber } from '@/lib/utils';

const portfolios = [
    {
        id: 1,
        name: 'Long-term Investments',
        description: 'Blue chip stocks and ETFs for retirement',
        totalValue: 45280,
        totalInvested: 38500,
        change: 17.61,
        assets: 12,
        lastUpdated: '2 hours ago',
    },
    {
        id: 2,
        name: 'Crypto Portfolio',
        description: 'Bitcoin, Ethereum and altcoins',
        totalValue: 18450,
        totalInvested: 15000,
        change: 23.0,
        assets: 8,
        lastUpdated: '1 hour ago',
    },
    {
        id: 3,
        name: 'Pokemon Cards',
        description: 'Vintage and graded collectible cards',
        totalValue: 8720,
        totalInvested: 6200,
        change: 40.65,
        assets: 24,
        lastUpdated: '3 days ago',
    },
    {
        id: 4,
        name: 'Short-term Trading',
        description: 'Active trading positions',
        totalValue: 5840,
        totalInvested: 6500,
        change: -10.15,
        assets: 5,
        lastUpdated: '30 min ago',
    },
];

export default function PortfoliosView() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPortfolio, setEditingPortfolio] = useState<
        (typeof portfolios)[0] | null
    >(null);

    const totalValue = portfolios.reduce((sum, p) => sum + p.totalValue, 0);
    const totalInvested = portfolios.reduce(
        (sum, p) => sum + p.totalInvested,
        0,
    );
    const totalChange = ((totalValue - totalInvested) / totalInvested) * 100;

    return (
        <div className='space-y-6 m-5'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-semibold tracking-tight'>
                        Portfolios
                    </h1>
                    <p className='text-sm text-muted-foreground'>
                        Manage your investment portfolios
                    </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setEditingPortfolio(null)}>
                            <Plus className='mr-2 size-4' />
                            Add Portfolio
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[425px]'>
                        <DialogHeader>
                            <DialogTitle>
                                {editingPortfolio
                                    ? 'Edit Portfolio'
                                    : 'Create Portfolio'}
                            </DialogTitle>
                            <DialogDescription>
                                {editingPortfolio
                                    ? 'Make changes to your portfolio here.'
                                    : 'Add a new portfolio to organize your investments.'}
                            </DialogDescription>
                        </DialogHeader>
                        <div className='grid gap-4 py-4'>
                            <div className='grid gap-2'>
                                <Label htmlFor='name'>Name</Label>
                                <Input
                                    id='name'
                                    placeholder='e.g., Long-term Investments'
                                    defaultValue={editingPortfolio?.name}
                                    className='border-border/50 bg-secondary'
                                />
                            </div>
                            <div className='grid gap-2'>
                                <Label htmlFor='description'>Description</Label>
                                <Textarea
                                    id='description'
                                    placeholder='Describe the purpose of this portfolio...'
                                    defaultValue={editingPortfolio?.description}
                                    className='border-border/50 bg-secondary resize-none'
                                    rows={3}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant='outline'
                                onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={() => setIsDialogOpen(false)}>
                                {editingPortfolio
                                    ? 'Save Changes'
                                    : 'Create Portfolio'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Summary Cards */}
            <div className='grid gap-4 sm:grid-cols-3'>
                <Card className='border border-border/50 bg-card'>
                    <CardContent className='p-5'>
                        <p className='text-sm font-medium text-muted-foreground'>
                            Total Value
                        </p>
                        <p className='mt-1 text-2xl font-semibold'>
                            ${formatNumber(totalValue)}
                        </p>
                        <div className='mt-2 flex items-center gap-1'>
                            {totalChange >= 0 ? (
                                <TrendingUp className='size-4 text-success' />
                            ) : (
                                <TrendingDown className='size-4 text-destructive' />
                            )}
                            <span
                                className={
                                    totalChange >= 0
                                        ? 'text-sm text-success'
                                        : 'text-sm text-destructive'
                                }>
                                {totalChange >= 0 ? '+' : ''}
                                {totalChange.toFixed(2)}%
                            </span>
                        </div>
                    </CardContent>
                </Card>
                <Card className='border border-border/50 bg-card'>
                    <CardContent className='p-5'>
                        <p className='text-sm font-medium text-muted-foreground'>
                            Total Invested
                        </p>
                        <p className='mt-1 text-2xl font-semibold'>
                            ${formatNumber(totalValue)}
                        </p>
                        <p className='mt-2 text-sm text-muted-foreground'>
                            Across {portfolios.length} portfolios
                        </p>
                    </CardContent>
                </Card>
                <Card className='border border-border/50 bg-card'>
                    <CardContent className='p-5'>
                        <p className='text-sm font-medium text-muted-foreground'>
                            Total P/L
                        </p>
                        <p
                            className={`mt-1 text-2xl font-semibold ${totalValue - totalInvested >= 0 ? 'text-success' : 'text-destructive'}`}>
                            {totalValue - totalInvested >= 0 ? '+' : ''}$
                            {formatNumber(totalValue - totalInvested)}
                        </p>
                        <p className='mt-2 text-sm text-muted-foreground'>
                            Unrealized gains
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Portfolio Grid */}
            <div className='grid gap-4 sm:grid-cols-2'>
                {portfolios.map((portfolio) => (
                    <Card
                        key={portfolio.id}
                        className='group border border-border/50 bg-card transition-all hover:border-primary/30'>
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
                                        <DropdownMenuItem
                                            onClick={() => {
                                                setEditingPortfolio(portfolio);
                                                setIsDialogOpen(true);
                                            }}>
                                            <Pencil className='mr-2 size-4' />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className='text-destructive'>
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
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    className='gap-1'>
                                    View
                                    <ChevronRight className='size-4' />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
