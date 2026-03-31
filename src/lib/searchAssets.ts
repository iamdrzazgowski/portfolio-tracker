export async function searchAssets(q: string) {
    const query = q.toLowerCase();

    const [stockRes, cryptoRes] = await Promise.all([
        fetch(
            `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${process.env.STOCK_API_KEY}`,
            { next: { revalidate: 3600 } },
        ),
        fetch(`https://api.coingecko.com/api/v3/search?query=${query}`, {
            cache: 'no-store',
        }),
    ]);

    const [stockData, cryptoData] = await Promise.all([
        stockRes.json(),
        cryptoRes.json(),
    ]);

    const stocks = (stockData as any[])
        .filter(
            (item) =>
                !query ||
                item.symbol.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query),
        )
        .slice(0, 20)
        .map((item) => ({
            symbol: item.symbol,
            name: item.description,
            type: item.description.toUpperCase().includes('ETF')
                ? 'ETF'
                : 'STOCK',
        }));

    const stockNames = new Set(stocks.map((s) => s.name.toLowerCase()));

    const cryptos = ((cryptoData.coins as any[]) || [])
        .filter((coin) => !stockNames.has(coin.name.toLowerCase()))
        .slice(0, 20)
        .map((coin) => ({
            symbol: coin.symbol.toUpperCase(),
            name: coin.name,
            type: 'CRYPTO',
            cryptoId: coin.id,
        }));

    return [...stocks, ...cryptos];
}
