import {
    ArrowDownLeft,
    ArrowUpRight,
    MoreHorizontal,
    Pencil,
    Trash2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
} from './transactions-table.utils';

interface TransactionRowProps {
    transaction: Transaction;
    onEdit?: (transaction: Transaction) => void;
    onDelete?: (id: string) => void;
}

export function TransactionRow({ transaction, onEdit, onDelete }: TransactionRowProps) {
    const isBuy = transaction.type === 'BUY';

    return (
        <TableRow className='group odd:bg-background even:bg-muted/20 hover:bg-muted/40'>
            <TableCell className='px-3'>
                <Badge
                    variant='secondary'
                    className={
                        isBuy
                            ? 'bg-success/15 text-success border border-success/30'
                            : 'bg-destructive/15 text-destructive border border-destructive/30'
                    }>
                    {isBuy ? (
                        <ArrowDownLeft className='mr-1 size-3' />
                    ) : (
                        <ArrowUpRight className='mr-1 size-3' />
                    )}
                    {isBuy ? 'buy' : 'sell'}
                </Badge>
            </TableCell>
            <TableCell className='px-3'>
                <div>
                    <p className='font-medium text-foreground'>{transaction.asset.name}</p>
                    <p className='text-xs uppercase tracking-wide text-muted-foreground'>
                        {transaction.asset.symbol}
                    </p>
                </div>
            </TableCell>
            <TableCell className='px-3 text-muted-foreground'>
                {transaction.asset.portfolio.name}
            </TableCell>
            <TableCell className='px-3 text-right font-mono'>
                {formatNumber(transaction.quantity)}
            </TableCell>
            <TableCell className='px-3 text-right font-mono'>
                {displayCurrency(transaction.asset.currency)} {formatMoney(transaction.price)}
            </TableCell>
            <TableCell
                className={`px-3 text-right font-mono font-semibold ${isBuy ? 'text-success' : 'text-destructive'}`}>
                {displayCurrency(transaction.asset.currency)}{' '}
                {formatTransactionTotal(transaction)}
            </TableCell>
            <TableCell className='px-3 text-muted-foreground'>
                {formatDate(transaction.date)}
            </TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant='ghost'
                            size='icon'
                            className='size-8 opacity-0 transition-opacity group-hover:opacity-100'>
                            <MoreHorizontal className='size-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuItem onClick={() => onEdit?.(transaction)}>
                            <Pencil className='mr-2 size-4' />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className='text-destructive'
                            onClick={() => onDelete?.(transaction.id)}>
                            <Trash2 className='mr-2 size-4' />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
}
