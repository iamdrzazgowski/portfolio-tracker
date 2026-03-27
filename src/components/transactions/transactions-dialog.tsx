'use client';

import { useEffect, useState, useRef, useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
import { createTransactionAction } from '@/actions/transaction';
import { useRouter } from 'next/navigation';

interface AddTransactionDialogProps {
    portfolios: Portfolio[];
    triggerClassName?: string;
}

interface FormValues {
    type: 'BUY' | 'SELL';
    date: string;
    portfolioId: string;
    asset: Asset | null;
    quantity: number;
    price: number;
}

export function AddTransactionDialog({
    portfolios,
    triggerClassName,
}: AddTransactionDialogProps) {
    const [open, setOpen] = useState(false);
    const [assetQuery, setAssetQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [selectedAsset, setSelectedAsset] = useState<any>(null);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const assetInputRef = useRef<HTMLInputElement>(null);

    const { control, handleSubmit, setValue, watch, reset } =
        useForm<FormValues>({
            defaultValues: {
                type: 'BUY',
                date: '',
                portfolioId: '',
                asset: null,
                quantity: 0,
                price: 0,
            },
        });

    const watchAsset = watch('asset');

    useEffect(() => {
        const timeout = setTimeout(async () => {
            if (!assetQuery) {
                setSuggestions([]);
                return;
            }

            if (
                selectedAsset &&
                assetQuery.toUpperCase() === selectedAsset.symbol.toUpperCase()
            ) {
                setSuggestions([]);
                return;
            }

            const res = await fetch(`/api/assets/search?q=${assetQuery}`);
            const data = await res.json();

            setSuggestions(data);
        }, 300);

        return () => clearTimeout(timeout);
    }, [assetQuery, selectedAsset]);

    const fetchPrice = async () => {
        if (!watchAsset) return;

        const res = await fetch(
            `/api/assets/price?symbol=${watchAsset.symbol}&type=${watchAsset.type}&cryptoId=${watchAsset.id || ''}`,
        );
        const data = await res.json();
        setValue('price', data?.price ?? 0);
    };

    const onSubmit = (data: FormValues | FormData) => {
        startTransition(async () => {
            createTransactionAction(data);
            setOpen(false);
            reset();
            router.refresh();
        });
    };

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

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='grid gap-5 py-4'>
                    <div className='grid grid-cols-2 gap-4'>
                        {/* Type */}
                        <div className='grid gap-2'>
                            <Label>Type</Label>
                            <Controller
                                control={control}
                                name='type'
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={(val) =>
                                            field.onChange(val)
                                        }>
                                        <SelectTrigger className='border-border/50 bg-secondary'>
                                            <SelectValue placeholder='Select type' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='BUY'>
                                                Buy
                                            </SelectItem>
                                            <SelectItem value='SELL'>
                                                Sell
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                        {/* Date */}
                        <div className='grid gap-2'>
                            <Label>Date</Label>
                            <Controller
                                control={control}
                                name='date'
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type='date'
                                        className='border-border/50 bg-secondary'
                                    />
                                )}
                            />
                        </div>
                    </div>

                    {/* Portfolio */}
                    <div className='grid gap-2'>
                        <Label>Portfolio</Label>
                        <Controller
                            control={control}
                            name='portfolioId'
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={(val) =>
                                        field.onChange(val)
                                    }>
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
                            )}
                        />
                    </div>

                    {/* Asset */}
                    <div className='grid gap-2 relative'>
                        <Label htmlFor='asset-input'>Asset</Label>
                        <Input
                            id='asset-input'
                            placeholder='Np. BTC, AAPL, ETH'
                            className='border-border/50 bg-secondary'
                            value={assetQuery}
                            ref={assetInputRef}
                            onChange={(e) => {
                                setAssetQuery(e.target.value);
                                setSelectedAsset(null);
                            }}
                        />

                        {/* Suggestions dropdown */}
                        {suggestions.length > 0 && (
                            <div className='absolute top-full left-0 mt-1 border rounded-md max-h-40 overflow-y-auto z-50 bg-background w-full shadow'>
                                {suggestions.map((asset, index) => (
                                    <div
                                        key={`${asset.symbol}-${asset.type}-${index}`}
                                        className='p-2 cursor-pointer hover:bg-muted'
                                        onClick={() => {
                                            setSelectedAsset(asset);
                                            setAssetQuery(asset.symbol);
                                            setSuggestions([]);
                                            setValue('asset', asset);
                                        }}>
                                        {asset.name} ({asset.symbol}) [
                                        {asset.type}]
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        {/* Quantity */}
                        <div className='grid gap-2'>
                            <div className='flex h-8 items-center'>
                                <Label>Quantity</Label>
                            </div>
                            <Controller
                                control={control}
                                name='quantity'
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type='number'
                                        placeholder='0.00'
                                        className='border-border/50 bg-secondary'
                                    />
                                )}
                            />
                        </div>

                        {/* Price */}
                        <div className='grid gap-2'>
                            <div className='flex h-8 items-center justify-between gap-2'>
                                <Label>Unit Price</Label>
                                <Button
                                    type='button'
                                    size='sm'
                                    variant='outline'
                                    onClick={fetchPrice}
                                    className='h-8 px-2 text-xs'>
                                    Pobierz cenę
                                </Button>
                            </div>
                            <Controller
                                control={control}
                                name='price'
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type='number'
                                        placeholder='0.00'
                                        className='border-border/50 bg-secondary'
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant='outline'
                            onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type='submit'>Add Transaction</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
