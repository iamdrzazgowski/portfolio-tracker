'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody } from '@/components/ui/table';
import { Transaction, TransactionType } from '@/types/transactions';
import { EmptyTransactionsState } from './empty-transactions-state';
import { TransactionRow } from './transaction-row';
import { TransactionsTableHeader } from './transactions-table-header';
import { TransactionsToolbar } from './transactions-toolbar';

interface TransactionsTableProps {
    transactions: Transaction[];
    onEdit?: (transaction: Transaction) => void;
    onDelete?: (id: string) => void;
}

type FilterValue = 'all' | TransactionType;

export function TransactionsTable({
    transactions,
    onEdit,
    onDelete,
}: TransactionsTableProps) {
    const [filter, setFilter] = useState<FilterValue>('all');
    const [search, setSearch] = useState('');

    const filtered = transactions
        .filter((t) => filter === 'all' || t.type === filter)
        .filter((t) => {
            if (!search) return true;
            const q = search.toLowerCase();
            return (
                t.asset.name.toLowerCase().includes(q) ||
                t.asset.symbol.toLowerCase().includes(q) ||
                t.asset.portfolio.name.toLowerCase().includes(q)
            );
        });

    return (
        <Card className='border border-border/60 bg-card shadow-sm'>
            <CardHeader className='pb-4'>
                <TransactionsToolbar
                    search={search}
                    filter={filter}
                    onSearchChange={setSearch}
                    onFilterChange={setFilter}
                />
            </CardHeader>
            <CardContent className='pt-0'>
                <div className='overflow-hidden rounded-xl border border-border/60 bg-background'>
                    <Table className='[&_td]:py-3 [&_th]:py-3'>
                        <TransactionsTableHeader />
                        <TableBody>
                            {filtered.map((transaction) => (
                                <TransactionRow
                                    key={transaction.id}
                                    transaction={transaction}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ))}
                            {filtered.length === 0 && <EmptyTransactionsState />}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
