export function formatNumber(num: number): string {
    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 0,
    }).format(num);
}
