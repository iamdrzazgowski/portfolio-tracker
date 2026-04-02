import YahooFinance from 'yahoo-finance2';

export async function searchAssets(q: string) {
    const query = q.toLowerCase().trim();

    // Utwórz instancję klienta
    const yf = new YahooFinance();

    // 🔹 STOCK / ETF przez Yahoo Finance
    const yahooData = await yf.search(query);
    const stocks = (yahooData.quotes || [])
        .filter((item) => item.symbol) // tylko realne tickery
        .slice(0, 30)
        .map((item) => {
            const desc = item.shortname || item.longname || item.symbol || '';
            const rawType = (item.quoteType || '').toUpperCase();

            let type: 'STOCK' | 'ETF' | 'OTHER';
            if (rawType === 'ETF') type = 'ETF';
            else if (rawType === 'EQUITY') type = 'STOCK';
            else if (rawType === 'REIT') type = 'OTHER';
            else if (
                desc.toUpperCase().includes('ETF') ||
                desc.toUpperCase().includes('FUND') ||
                desc.toUpperCase().includes('TRUST')
            )
                type = 'ETF';
            else type = 'STOCK';

            // automatyczne mapowanie OTC (Pink Sheets)
            let symbol = item.symbol;
            if (item.exchange === 'PNK' || item.exchange === 'OTC') {
                symbol += '.PK';
            }

            return { symbol, name: desc, type };
        });

    // 🔒 Usuwanie duplikatów
    const stockKeys = new Set(
        stocks.map((s) => `${s.symbol}-${s.name}`.toLowerCase()),
    );

    // 💰 CRYPTO przez CoinGecko
    const cryptoRes = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`,
        { cache: 'no-store' },
    );
    const cryptoData = await cryptoRes.json();
    const cryptos = ((cryptoData.coins as any[]) || [])
        .filter(
            (coin) =>
                !stockKeys.has(`${coin.symbol}-${coin.name}`.toLowerCase()),
        )
        .slice(0, 20)
        .map((coin) => ({
            symbol: coin.symbol.toUpperCase(),
            name: coin.name,
            type: 'CRYPTO',
            cryptoId: coin.id,
        }));

    return [...stocks, ...cryptos];
}
