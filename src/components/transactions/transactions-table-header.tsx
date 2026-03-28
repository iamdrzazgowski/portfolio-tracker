import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function TransactionsTableHeader() {
    return (
        <TableHeader>
            <TableRow className='border-b border-border/50 hover:bg-transparent'>
                <TableHead className='px-3 text-[10px] font-normal uppercase tracking-[0.08em] text-muted-foreground sm:px-4'>
                    Operation
                </TableHead>
                <TableHead className='px-3 text-[10px] font-normal uppercase tracking-[0.08em] text-muted-foreground sm:px-4'>
                    Type
                </TableHead>
                <TableHead className='px-3 text-[10px] font-normal uppercase tracking-[0.08em] text-muted-foreground sm:px-4'>
                    Asset
                </TableHead>
                <TableHead className='hidden px-3 text-[10px] font-normal uppercase tracking-[0.08em] text-muted-foreground sm:table-cell sm:px-4'>
                    Portfolio
                </TableHead>
                <TableHead className='hidden px-3 text-right text-[10px] font-normal uppercase tracking-[0.08em] text-muted-foreground sm:table-cell sm:px-4'>
                    Quantity
                </TableHead>
                <TableHead className='hidden px-3 text-right text-[10px] font-normal uppercase tracking-[0.08em] text-muted-foreground sm:table-cell sm:px-4'>
                    Price
                </TableHead>
                <TableHead className='px-3 text-right text-[10px] font-normal uppercase tracking-[0.08em] text-muted-foreground sm:px-4'>
                    Total
                </TableHead>
                <TableHead className='px-3 text-[10px] font-normal uppercase tracking-[0.08em] text-muted-foreground sm:px-4'>
                    Date
                </TableHead>
                <TableHead className='w-10 sm:w-12' />
            </TableRow>
        </TableHeader>
    );
}
