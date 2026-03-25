import {
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export function TransactionsTableHeader() {
    return (
        <TableHeader>
            <TableRow className='bg-muted/50 hover:bg-muted/50'>
                <TableHead className='px-3 font-semibold text-muted-foreground'>
                    Type
                </TableHead>
                <TableHead className='px-3 font-semibold text-muted-foreground'>
                    Asset
                </TableHead>
                <TableHead className='px-3 font-semibold text-muted-foreground'>
                    Portfolio
                </TableHead>
                <TableHead className='px-3 text-right font-semibold text-muted-foreground'>
                    Quantity
                </TableHead>
                <TableHead className='px-3 text-right font-semibold text-muted-foreground'>
                    Price
                </TableHead>
                <TableHead className='px-3 text-right font-semibold text-muted-foreground'>
                    Total
                </TableHead>
                <TableHead className='px-3 font-semibold text-muted-foreground'>
                    Date
                </TableHead>
                <TableHead className='w-10' />
            </TableRow>
        </TableHeader>
    );
}
