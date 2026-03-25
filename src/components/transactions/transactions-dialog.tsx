'use client';

import { useMemo, useState } from 'react';
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
import { Asset, Portfolio, TransactionType } from '@/types/transactions';
import { TransactionsDialogAssetFields } from './transactions-dialog-asset-fields';
import { TransactionsDialogBasicFields } from './transactions-dialog-basic-fields';
import { TransactionsDialogQuantityPriceFields } from './transactions-dialog-quantity-price-fields';

interface AddTransactionDialogProps {
    portfolios: Portfolio[];
    assets: Asset[];
    triggerClassName?: string;
    onAdd?: (data: {
        type: TransactionType;
        assetId: string;
        quantity: number;
        price: number;
        date: string;
    }) => void;
    onFetchCurrentPrice?: (
        assetQuery: string
    ) => Promise<number | null> | number | null;
}

export function AddTransactionDialog({
    portfolios,
    assets,
    triggerClassName,
    onAdd,
    onFetchCurrentPrice,
}: AddTransactionDialogProps) {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<TransactionType>('BUY');
    const [selectedPortfolioId, setSelectedPortfolioId] = useState('');
    const [assetInput, setAssetInput] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');
    const [isFetchingPrice, setIsFetchingPrice] = useState(false);
    const [fetchPriceError, setFetchPriceError] = useState<string | null>(null);

    // Filter assets by selected portfolio
    const filteredAssets = selectedPortfolioId
        ? assets.filter((a) => a.portfolioId === selectedPortfolioId)
        : assets;

    const normalizedAssetInput = assetInput.trim().toLowerCase();

    const matchedAsset = useMemo(
        () =>
            filteredAssets.find((a) => {
                const byId = a.id.toLowerCase() === normalizedAssetInput;
                const bySymbol = a.symbol.toLowerCase() === normalizedAssetInput;
                const byName = a.name.toLowerCase() === normalizedAssetInput;
                return byId || bySymbol || byName;
            }),
        [filteredAssets, normalizedAssetInput]
    );

    const resolvedAssetId = matchedAsset?.id ?? assetInput.trim();

    function handleSubmit() {
        if (!resolvedAssetId || !quantity || !price || !date) return;
        onAdd?.({
            type,
            assetId: resolvedAssetId,
            quantity: parseFloat(quantity),
            price: parseFloat(price),
            date,
        });
        setOpen(false);
        // Reset
        setType('BUY');
        setSelectedPortfolioId('');
        setAssetInput('');
        setQuantity('');
        setPrice('');
        setDate('');
        setFetchPriceError(null);
    }

    async function handleFetchCurrentPrice() {
        const query = assetInput.trim();
        if (!query) {
            setFetchPriceError('Wpisz najpierw asset (np. BTC).');
            return;
        }

        setFetchPriceError(null);
        setIsFetchingPrice(true);
        try {
            let nextPrice: number | null = null;

            if (onFetchCurrentPrice) {
                nextPrice = await onFetchCurrentPrice(query);
            } else if (matchedAsset?.lastPrice != null) {
                nextPrice = matchedAsset.lastPrice;
            }

            if (nextPrice == null || Number.isNaN(nextPrice)) {
                setFetchPriceError('Nie udało się pobrać aktualnej ceny.');
                return;
            }

            setPrice(String(nextPrice));
        } finally {
            setIsFetchingPrice(false);
        }
    }

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
                    <TransactionsDialogBasicFields
                        type={type}
                        date={date}
                        onTypeChange={setType}
                        onDateChange={setDate}
                    />

                    <TransactionsDialogAssetFields
                        portfolios={portfolios}
                        filteredAssets={filteredAssets}
                        selectedPortfolioId={selectedPortfolioId}
                        assetInput={assetInput}
                        matchedAssetCurrency={matchedAsset?.currency}
                        fetchPriceError={fetchPriceError}
                        onPortfolioChange={(value) => {
                            setSelectedPortfolioId(value);
                            setAssetInput('');
                            setFetchPriceError(null);
                        }}
                        onAssetInputChange={(value) => {
                            setAssetInput(value);
                            setFetchPriceError(null);
                        }}
                    />

                    <TransactionsDialogQuantityPriceFields
                        quantity={quantity}
                        price={price}
                        assetInput={assetInput}
                        isFetchingPrice={isFetchingPrice}
                        onQuantityChange={setQuantity}
                        onPriceChange={setPrice}
                        onFetchCurrentPrice={handleFetchCurrentPrice}
                    />
                </div>
                <DialogFooter>
                    <Button variant='outline' onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit}>Add Transaction</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
