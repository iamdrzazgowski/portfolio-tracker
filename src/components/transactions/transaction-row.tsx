import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { Transaction } from '@/types/transactions';
import {
    displayCurrency,
    formatDate,
    formatMoney,
    formatNumber,
    formatTransactionTotal,
} from '../../lib/transactions-table.utils';
import { AssetTypeBadge } from './asset-type-badge';

interface TransactionRowProps {
    transaction: Transaction;
    onEdit?: (transaction: Transaction) => void;
    onDelete?: (id: string) => void;
}

export function TransactionRow({
    transaction,
    onEdit,
    onDelete,
}: TransactionRowProps) {
    const isBuy = transaction.type === 'BUY';
    console.log(transaction);

    return (
        <TableRow className='group border-t border-border/50 hover:bg-muted/30 transition-colors'>
            {/* Type */}
            <TableCell className='px-3 sm:px-4'>
                <div className='flex items-center gap-2'>
                    <span
                        className={`inline-block size-1.5 flex-shrink-0 rounded-full ${
                            isBuy ? 'bg-success' : 'bg-destructive'
                        }`}
                    />
                    <span
                        className={`text-[11px] font-medium uppercase tracking-[0.06em] ${
                            isBuy ? 'text-success' : 'text-destructive'
                        }`}>
                        {isBuy ? 'buy' : 'sell'}
                    </span>
                </div>
            </TableCell>

            <TableCell className='hidden px-4 text-xs text-muted-foreground sm:table-cell'>
                <AssetTypeBadge type={transaction.asset.type} />
            </TableCell>

            {/* Asset */}
            <TableCell className='px-3 sm:px-4'>
                <p className='text-sm font-medium text-foreground leading-tight'>
                    {transaction.asset.name}
                </p>
                <p className='mt-0.5 text-[10px] uppercase tracking-[0.07em] text-muted-foreground'>
                    {transaction.asset.symbol}
                </p>
            </TableCell>

            {/* Portfolio */}
            <TableCell className='hidden px-4 text-xs text-muted-foreground sm:table-cell'>
                {transaction.asset.portfolio.name}
            </TableCell>

            {/* Quantity */}
            <TableCell className='hidden px-4 text-right font-mono text-xs text-foreground sm:table-cell'>
                {formatNumber(transaction.quantity)}
            </TableCell>

            {/* Price */}
            <TableCell className='hidden px-4 text-right font-mono text-xs text-muted-foreground sm:table-cell'>
                {displayCurrency(transaction.asset.currency)}&nbsp;
                {formatMoney(transaction.price)}
            </TableCell>

            {/* Total */}
            <TableCell
                className={`px-3 text-right font-serif text-sm font-medium sm:px-4 ${
                    isBuy ? 'text-success' : 'text-destructive'
                }`}>
                {displayCurrency(transaction.asset.currency)}&nbsp;
                {formatTransactionTotal(transaction)}
            </TableCell>

            {/* Date */}
            <TableCell className='px-3 text-xs text-muted-foreground sm:px-4'>
                {formatDate(transaction.date)}
            </TableCell>

            {/* Actions */}
            <TableCell className='px-1.5 sm:px-2'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant='ghost'
                            size='icon'
                            className='size-7 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100'>
                            <MoreHorizontal className='size-3.5' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='text-xs'>
                        <DropdownMenuItem
                            className='text-xs text-destructive focus:text-destructive'
                            onClick={() => onDelete?.(transaction.id)}>
                            <Trash2 className='mr-2 size-3.5' />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
}
