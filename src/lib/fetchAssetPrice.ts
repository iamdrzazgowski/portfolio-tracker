const finnhubApiKey = process.env.STOCK_API_KEY;

export async function fetchAssetPrice(asset: {
    symbol: string;
    type: 'STOCK' | 'ETF' | 'CRYPTO' | 'COLLECTIBLE';
    cryptoId?: string | null;
}): Promise<number | null> {
    try {
        if (asset.type === 'STOCK' || asset.type === 'ETF') {
            if (!asset.symbol || !finnhubApiKey) return null;

            const res = await fetch(
                `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(asset.symbol)}&token=${finnhubApiKey}`,
            );
            const data = await res.json();
            return data.c ?? null;
        }

        if (asset.type === 'CRYPTO') {
            const id = asset.cryptoId ?? asset.symbol.toLowerCase();
            const res = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`,
            );
            const data = await res.json();
            return data[id]?.usd ?? null;
        }

        return null;
    } catch {
        return null;
    }
}
