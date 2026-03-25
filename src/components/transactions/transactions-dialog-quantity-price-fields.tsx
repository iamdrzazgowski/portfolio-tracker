'use client';

import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TransactionsDialogQuantityPriceFieldsProps {
    quantity: string;
    price: string;
    assetInput: string;
    isFetchingPrice: boolean;
    onQuantityChange: (value: string) => void;
    onPriceChange: (value: string) => void;
    onFetchCurrentPrice: () => void;
}

export function TransactionsDialogQuantityPriceFields({
    quantity,
    price,
    assetInput,
    isFetchingPrice,
    onQuantityChange,
    onPriceChange,
    onFetchCurrentPrice,
}: TransactionsDialogQuantityPriceFieldsProps) {
    return (
        <div className='grid grid-cols-2 gap-4'>
            <div className='grid gap-2'>
                <div className='flex h-8 items-center'>
                    <Label>Quantity</Label>
                </div>
                <Input
                    type='number'
                    placeholder='0.00'
                    className='border-border/50 bg-secondary'
                    value={quantity}
                    onChange={(e) => onQuantityChange(e.target.value)}
                />
            </div>
            <div className='grid gap-2'>
                <div className='flex h-8 items-center justify-between gap-2'>
                    <Label>Unit Price</Label>
                    <Button
                        type='button'
                        size='sm'
                        variant='outline'
                        className='h-8 px-2 text-xs'
                        onClick={onFetchCurrentPrice}
                        disabled={isFetchingPrice || !assetInput.trim()}>
                        {isFetchingPrice ? (
                            <Loader2 className='mr-1 size-3 animate-spin' />
                        ) : null}
                        Pobierz cenę
                    </Button>
                </div>
                <Input
                    type='number'
                    placeholder='0.00'
                    className='border-border/50 bg-secondary'
                    value={price}
                    onChange={(e) => onPriceChange(e.target.value)}
                />
            </div>
        </div>
    );
}
