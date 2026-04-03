import { getTransactionsAction } from '@/actions/transaction';
import EmptyRecentActivity from './empty-recent-activity';
import { CardContent } from '../ui/card';
import { Wallet } from 'lucide-react';
import { TransactionsTableHeader } from '../transactions/transactions-table-header';
import { Table, TableBody } from '../ui/table';
import { TransactionRow } from '../transactions/transaction-row';
import { EmptyTransactionsState } from '../transactions/empty-transactions-state';

export default async function RecentActivity() {
    const transactions = await getTransactionsAction();
    const filtered = transactions.slice(0, 4);

    return (
        <div className='rounded-xl border border-border/50 bg-card p-5'>
            <div className='flex items-center justify-between pb-6'>
                <div>
                    <p className='text-sm font-medium text-foreground'>
                        Recent Activity
                    </p>
                    <p className='mt-0.5 text-[10px] uppercase tracking-[0.08em] text-muted-foreground'>
                        Latest buy &amp; sell transactions
                    </p>
                </div>
                <div className='flex size-8 items-center justify-center rounded-lg bg-accent'>
                    <Wallet className='size-4 text-primary/40' />
                </div>
            </div>
            <CardContent className='p-0'>
                <div className='overflow-x-auto'>
                    <Table className='min-w-[680px] [&_td]:py-2.5 [&_th]:py-2.5 sm:min-w-0'>
                        <TransactionsTableHeader type='view' />
                        <TableBody>
                            {filtered.map((transaction) => (
                                <TransactionRow
                                    key={transaction.id}
                                    transaction={transaction}
                                    type='view'
                                />
                            ))}
                            {filtered.length === 0 && (
                                <EmptyTransactionsState />
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </div>
    );
}
