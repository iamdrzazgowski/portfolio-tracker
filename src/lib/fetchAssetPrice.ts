// /lib/fetchAssetPrice.ts
import YahooFinance from 'yahoo-finance2';

export async function fetchAssetPrice(asset: {
    symbol: string;
    type: 'STOCK' | 'ETF' | 'CRYPTO';
    cryptoId?: string | null;
}): Promise<number | null> {
    try {
        if (!asset.symbol) return null;

        // Utwórz instancję YahooFinance
        const yf = new YahooFinance();

        // STOCK / ETF
        if (asset.type === 'STOCK' || asset.type === 'ETF') {
            // Wywołanie quoteSummary dla modułu price
            const quote = await yf.quoteSummary(asset.symbol, {
                modules: ['price'],
            });
            return quote.price?.regularMarketPrice ?? null;
        }

        // CRYPTO (CoinGecko)
        if (asset.type === 'CRYPTO') {
            const id = asset.cryptoId ?? asset.symbol.toLowerCase();
            const res = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`,
            );
            const data = await res.json();
            return data[id]?.usd ?? null;
        }

        return null;
    } catch (err) {
        console.error('Price fetch error:', err);
        return null;
    }
}
