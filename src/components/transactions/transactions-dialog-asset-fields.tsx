'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Asset, Portfolio } from '@/types/transactions';

interface TransactionsDialogAssetFieldsProps {
    portfolios: Portfolio[];
    filteredAssets: Asset[];
    selectedPortfolioId: string;
    assetInput: string;
    matchedAssetCurrency?: string;
    fetchPriceError?: string | null;
    onPortfolioChange: (value: string) => void;
    onAssetInputChange: (value: string) => void;
}

export function TransactionsDialogAssetFields({
    portfolios,
    filteredAssets,
    selectedPortfolioId,
    assetInput,
    matchedAssetCurrency,
    fetchPriceError,
    onPortfolioChange,
    onAssetInputChange,
}: TransactionsDialogAssetFieldsProps) {
    return (
        <>
            <div className='grid gap-2'>
                <Label>Portfolio</Label>
                <Select value={selectedPortfolioId} onValueChange={onPortfolioChange}>
                    <SelectTrigger className='border-border/50 bg-secondary'>
                        <SelectValue placeholder='Select portfolio' />
                    </SelectTrigger>
                    <SelectContent>
                        {portfolios.map((portfolio) => (
                            <SelectItem key={portfolio.id} value={portfolio.id}>
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
                    value={assetInput}
                    onChange={(e) => onAssetInputChange(e.target.value)}
                />
                <datalist id='asset-suggestions'>
                    {filteredAssets.map((asset) => (
                        <option
                            key={asset.id}
                            value={asset.symbol}>{`${asset.symbol} - ${asset.name}`}</option>
                    ))}
                </datalist>
                <p className='text-xs text-muted-foreground'>
                    Pole jest wpisywalne (pod API), ale ma podpowiedzi z aktualnej
                    listy assetów.
                </p>
            </div>

            {assetInput && (
                <p className='text-xs text-muted-foreground'>
                    Currency:{' '}
                    <span className='font-medium'>{matchedAssetCurrency ?? '—'}</span>
                </p>
            )}
            {fetchPriceError && (
                <p className='text-xs text-destructive'>{fetchPriceError}</p>
            )}
        </>
    );
}
