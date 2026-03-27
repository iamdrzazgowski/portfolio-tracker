import { getPortfoliosAction } from '@/actions/portfolio';
import { getTransactionsAction } from '@/actions/transaction';
import { TransactionsView } from '@/components/transactions/transactions-view';
import { mockTransactions, mockAssets } from '@/data/mock-transactions';

export default async function TransactionsPage() {
    const userPortfolios = await getPortfoliosAction();
    const userTransactions = await getTransactionsAction();
    console.log(userTransactions);
    return (
        <TransactionsView
            initialTransactions={userTransactions.data}
            portfolios={userPortfolios}
            assets={mockAssets}
        />
    );
}
