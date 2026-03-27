import { getPortfoliosAction } from '@/actions/portfolio';
import { TransactionsView } from '@/components/transactions/transactions-view';
import { mockTransactions, mockAssets } from '@/data/mock-transactions';

export default async function TransactionsPage() {
    const userPortfolios = await getPortfoliosAction();
    console.log(userPortfolios);
    return (
        <TransactionsView
            initialTransactions={mockTransactions}
            portfolios={userPortfolios}
            assets={mockAssets}
        />
    );
}
