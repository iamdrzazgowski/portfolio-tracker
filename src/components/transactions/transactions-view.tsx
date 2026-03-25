'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardPageHeader } from '@/components/layout/dashboard-page-header';

import { Transaction, Portfolio, Asset } from '@/types/transactions';
import { TransactionsTable } from './transactions-table';
import { AddTransactionDialog } from './transactions-dialog';

interface TransactionsViewProps {
    initialTransactions: Transaction[];
    portfolios: Portfolio[];
    assets: Asset[];
}

export function TransactionsView({
    initialTransactions,
    portfolios,
    assets,
}: TransactionsViewProps) {
    const [transactions, setTransactions] =
        useState<Transaction[]>(initialTransactions);

    function handleAdd(data: {
        type: Transaction['type'];
        assetId: string;
        quantity: number;
        price: number;
        date: string;
    }) {
        const normalizedId = data.assetId.trim().toLowerCase();
        const asset =
            assets.find((a) => a.id.toLowerCase() === normalizedId) ??
            assets.find((a) => a.symbol.toLowerCase() === normalizedId) ??
            assets.find((a) => a.name.toLowerCase() === normalizedId);

        const fallbackPortfolio = portfolios.find((p) => p.id === 'manual') ??
            portfolios[0] ?? { id: 'manual', name: 'Manual' };

        const resolvedAsset: Asset =
            asset ??
            ({
                id: data.assetId,
                name: data.assetId.toUpperCase(),
                symbol: data.assetId.toUpperCase(),
                type: 'OTHER',
                currency: 'USD',
                lastPrice: data.price,
                lastPriceAt: new Date(),
                estimatedValue: data.quantity * data.price,
                portfolioId: fallbackPortfolio.id,
                createdAt: new Date(),
                updatedAt: new Date(),
                portfolio: fallbackPortfolio,
            } as Asset);

        const newTx: Transaction = {
            id: crypto.randomUUID(),
            type: data.type,
            quantity: data.quantity,
            price: data.price,
            date: new Date(data.date),
            assetId: resolvedAsset.id,
            createdAt: new Date(),
            updatedAt: new Date(),
            asset: resolvedAsset,
        };

        setTransactions((prev) => [newTx, ...prev]);
    }

    function handleDelete(id: string) {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
    }

    function handleEdit(tx: Transaction) {
        // placeholder – wire up your edit dialog here
        console.log('Edit', tx);
    }

    function handleExport() {
        const headers = [
            'type',
            'asset',
            'symbol',
            'portfolio',
            'quantity',
            'price',
            'total',
            'currency',
            'date',
        ];
        const rows = transactions.map((t) => [
            t.type,
            t.asset.name,
            t.asset.symbol,
            t.asset.portfolio.name,
            t.quantity,
            t.price,
            t.quantity * t.price,
            t.asset.currency,
            t.date instanceof Date
                ? t.date.toISOString().split('T')[0]
                : t.date,
        ]);
        const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'transactions.csv';
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <div className='space-y-6'>
            <DashboardPageHeader
                title='Transactions'
                description='Track all your buy and sell activities'>
                <Button variant='outline' onClick={handleExport}>
                    <Download className='mr-2 size-4' />
                    Export
                </Button>
                <AddTransactionDialog
                    portfolios={portfolios}
                    assets={assets}
                    onAdd={handleAdd}
                    onFetchCurrentPrice={(assetQuery) => {
                        const normalized = assetQuery.trim().toLowerCase();
                        const found = assets.find(
                            (a) =>
                                a.symbol.toLowerCase() === normalized ||
                                a.name.toLowerCase() === normalized ||
                                a.id.toLowerCase() === normalized,
                        );
                        return found?.lastPrice ?? null;
                    }}
                />
            </DashboardPageHeader>
            <TransactionsTable
                transactions={transactions}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}
