'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Asset, Portfolio } from '@/types/transactions';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';

interface AddTransactionDialogProps {
    portfolios: Portfolio[];
    assets: Asset[];
    triggerClassName?: string;
}

export function AddTransactionDialog({
    portfolios,
    assets,
    triggerClassName,
}: AddTransactionDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className={triggerClassName}>
                    <Plus className='mr-2 size-4' />
                    Add Transaction
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[500px]'>
                <DialogHeader>
                    <DialogTitle>Add Transaction</DialogTitle>
                    <DialogDescription>
                        Record a new buy or sell transaction.
                    </DialogDescription>
                </DialogHeader>
                <div className='grid gap-5 py-4'>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='grid gap-2'>
                            <Label>Type</Label>
                            <Select>
                                <SelectTrigger className='border-border/50 bg-secondary'>
                                    <SelectValue placeholder='Select type' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='BUY'>Buy</SelectItem>
                                    <SelectItem value='SELL'>Sell</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='grid gap-2'>
                            <Label>Date</Label>
                            <Input
                                type='date'
                                className='border-border/50 bg-secondary'
                            />
                        </div>
                    </div>

                    <div className='grid gap-2'>
                        <Label>Portfolio</Label>
                        <Select>
                            <SelectTrigger className='border-border/50 bg-secondary'>
                                <SelectValue placeholder='Select portfolio' />
                            </SelectTrigger>
                            <SelectContent>
                                {portfolios.map((portfolio) => (
                                    <SelectItem
                                        key={portfolio.id}
                                        value={portfolio.id}>
                                        {portfolio.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className='grid gap-2'>
                        <Label htmlFor='asset-input'>Asset</Label>
                        <Input
                            id='asset-input'
                            placeholder='Np. BTC, AAPL, ETH'
                            list='asset-suggestions'
                            className='border-border/50 bg-secondary'
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='grid gap-2'>
                            <div className='flex h-8 items-center'>
                                <Label>Quantity</Label>
                            </div>
                            <Input
                                type='number'
                                placeholder='0.00'
                                className='border-border/50 bg-secondary'
                            />
                        </div>
                        <div className='grid gap-2'>
                            <div className='flex h-8 items-center justify-between gap-2'>
                                <Label>Unit Price</Label>
                                <Button
                                    type='button'
                                    size='sm'
                                    variant='outline'
                                    className='h-8 px-2 text-xs'>
                                    Pobierz cenę
                                </Button>
                            </div>
                            <Input
                                type='number'
                                placeholder='0.00'
                                className='border-border/50 bg-secondary'
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant='outline' onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={() => setOpen(false)}>
                        Add Transaction
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
