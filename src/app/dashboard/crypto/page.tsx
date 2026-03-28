import { getPortfoliosAction } from '@/actions/portfolio';
import { getTransactionsAction } from '@/actions/transaction';
import { DashboardPageHeader } from '@/components/layout/dashboard-page-header';
import { AddTransactionDialog } from '@/components/transactions/transactions-dialog';
import { TransactionsTable } from '@/components/transactions/transactions-table';

export default async function CryptoPage() {
    const userTransactions = await getTransactionsAction();

    const filteredTransactions = Array.isArray(userTransactions)
        ? userTransactions.filter((t) => t.asset.type === 'CRYPTO')
        : [];

    return (
        <div className='space-y-6'>
            <DashboardPageHeader
                title='Your Crypto'
                description='Track all your buy and sell activities'>
                <div className='flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center'>
                    {/* <AddTransactionDialog
                        portfolios={userPortfolios}
                        triggerClassName='w-full sm:w-auto'
                    /> */}
                </div>
            </DashboardPageHeader>
            <TransactionsTable transactions={filteredTransactions} />
        </div>
    );
}
