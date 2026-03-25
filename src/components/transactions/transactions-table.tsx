"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import { Transaction, TransactionType } from "@/types/transactions";
import { EmptyTransactionsState } from "./empty-transactions-state";
import { TransactionRow } from "./transaction-row";
import { TransactionsTableHeader } from "./transactions-table-header";
import { TransactionsToolbar } from "./transactions-toolbar";

interface TransactionsTableProps {
    transactions: Transaction[];
    onEdit?: (transaction: Transaction) => void;
    onDelete?: (id: string) => void;
}

type FilterValue = "all" | TransactionType;

export function TransactionsTable({
    transactions,
    onEdit,
    onDelete,
}: TransactionsTableProps) {
    const [filter, setFilter] = useState<FilterValue>("all");
    const [search, setSearch] = useState("");

    const filtered = transactions
        .filter((t) => filter === "all" || t.type === filter)
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
        <Card className="border border-border/50 bg-card shadow-none">
            <CardHeader className="px-4 pb-4 pt-5 sm:px-5">
                <TransactionsToolbar
                    search={search}
                    filter={filter}
                    onSearchChange={setSearch}
                    onFilterChange={setFilter}
                />
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table className="min-w-[680px] [&_td]:py-2.5 [&_th]:py-2.5 sm:min-w-0">
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
                            {filtered.length === 0 && (
                                <EmptyTransactionsState />
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
