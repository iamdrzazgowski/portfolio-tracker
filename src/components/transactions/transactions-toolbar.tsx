import { Filter, Search } from 'lucide-react';
import { CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface TransactionsToolbarProps {
    search: string;
    filter: 'all' | 'BUY' | 'SELL';
    onSearchChange: (value: string) => void;
    onFilterChange: (value: 'all' | 'BUY' | 'SELL') => void;
}

export function TransactionsToolbar({
    search,
    filter,
    onSearchChange,
    onFilterChange,
}: TransactionsToolbarProps) {
    return (
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <CardTitle className='text-base font-medium'>
                Transaction History
            </CardTitle>
            <div className='flex items-center gap-2'>
                <div className='relative'>
                    <Search className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
                    <Input
                        placeholder='Search transactions...'
                        className='w-64 border-border/60 bg-secondary/70 pl-9'
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
                <Select
                    value={filter}
                    onValueChange={(v) => onFilterChange(v as 'all' | 'BUY' | 'SELL')}>
                    <SelectTrigger className='w-32 border-border/60 bg-secondary/70'>
                        <Filter className='mr-2 size-4' />
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='all'>All</SelectItem>
                        <SelectItem value='BUY'>Buy</SelectItem>
                        <SelectItem value='SELL'>Sell</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
