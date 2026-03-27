import { getPortfoliosAction } from "@/actions/portfolio";
import { getTransactionsAction } from "@/actions/transaction";
import { TransactionsView } from "@/components/transactions/transactions-view";

export default async function TransactionsPage() {
    const userPortfolios = await getPortfoliosAction();
    const userTransactions = await getTransactionsAction();

    return (
        <TransactionsView
            transactions={userTransactions}
            portfolios={userPortfolios}
        />
    );
}
