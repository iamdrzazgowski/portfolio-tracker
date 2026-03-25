import { TableCell, TableRow } from '@/components/ui/table';

export function EmptyTransactionsState() {
    return (
        <TableRow>
            <TableCell colSpan={8} className='py-12 text-center text-sm text-muted-foreground'>
                No transactions found.
            </TableCell>
        </TableRow>
    );
}
