"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardPageHeader } from "@/components/layout/dashboard-page-header";

import { Transaction, Portfolio, Asset } from "@/types/transactions";
import { TransactionsTable } from "./transactions-table";
import { AddTransactionDialog } from "./transactions-dialog";

interface TransactionsViewProps {
    initialTransactions: Transaction[];
    portfolios: Portfolio[];
    assets: Asset[];
}

export function TransactionsView({
    transactions,
    portfolios,
}: TransactionsViewProps) {
    function handleDelete(id: string) {
        console.log("XD");
    }

    function handleEdit(tx: Transaction) {
        console.log("Edit", tx);
    }

    return (
        <div className="space-y-6">
            <DashboardPageHeader
                title="Transactions"
                description="Track all your buy and sell activities"
            >
                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                    <Button
                        variant="outline"
                        onClick={() => {}}
                        className="w-full sm:w-auto"
                    >
                        <Download className="mr-2 size-4" />
                        Export
                    </Button>
                    <AddTransactionDialog
                        portfolios={portfolios}
                        triggerClassName="w-full sm:w-auto"
                    />
                </div>
            </DashboardPageHeader>
            <TransactionsTable
                transactions={transactions}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}
