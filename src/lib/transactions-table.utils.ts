import { getTransactionTotal, Transaction } from '@/types/transactions';

const numberFormatter = new Intl.NumberFormat('pl-PL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 8,
});

const moneyFormatter = new Intl.NumberFormat('pl-PL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export function formatDate(date: Date | string): string {
    if (date instanceof Date) {
        return date.toISOString().split('T')[0];
    }

    return String(date);
}

export function formatNumber(value: number): string {
    return numberFormatter.format(value);
}

export function formatMoney(value: number): string {
    return moneyFormatter.format(value);
}

export function displayCurrency(currency: string): string {
    return currency.toUpperCase() === 'USD' ? '$' : currency;
}

export function formatTransactionTotal(transaction: Transaction): string {
    return formatMoney(getTransactionTotal(transaction));
}
