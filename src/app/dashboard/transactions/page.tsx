import { TransactionsView } from '@/components/transactions/transactions-view';
import {
    mockTransactions,
    mockPortfolios,
    mockAssets,
} from '@/data/mock-transactions';

export default async function TransactionsPage() {
    return (
        <TransactionsView
            initialTransactions={mockTransactions}
            portfolios={mockPortfolios}
            assets={mockAssets}
        />
    );
}
