'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { TransactionType } from '@/types/transactions';

interface TransactionsDialogBasicFieldsProps {
    type: TransactionType;
    date: string;
    onTypeChange: (value: TransactionType) => void;
    onDateChange: (value: string) => void;
}

export function TransactionsDialogBasicFields({
    type,
    date,
    onTypeChange,
    onDateChange,
}: TransactionsDialogBasicFieldsProps) {
    return (
        <div className='grid grid-cols-2 gap-4'>
            <div className='grid gap-2'>
                <Label>Type</Label>
                <Select
                    value={type}
                    onValueChange={(value) => onTypeChange(value as TransactionType)}>
                    <SelectTrigger className='border-border/50 bg-secondary'>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='BUY'>Buy</SelectItem>
                        <SelectItem value='SELL'>Sell</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className='grid gap-2'>
                <Label>Date</Label>
                <Input
                    type='date'
                    className='border-border/50 bg-secondary'
                    value={date}
                    onChange={(e) => onDateChange(e.target.value)}
                />
            </div>
        </div>
    );
}
