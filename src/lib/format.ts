export function formatNumber(num: number): string {
    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 2,
    }).format(num);
}
