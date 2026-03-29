import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q')?.toLowerCase() ?? '';

    try {
        const [stockRes, cryptoRes] = await Promise.all([
            fetch(
                `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${process.env.STOCK_API_KEY}`,
                { next: { revalidate: 3600 } }, // cache na godzinę — ta lista się nie zmienia często
            ),
            fetch(`https://api.coingecko.com/api/v3/search?query=${q}`, {
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
                    !q ||
                    item.symbol.toLowerCase().includes(q) ||
                    item.description.toLowerCase().includes(q),
            )
            .slice(0, 20) // ogranicz żeby nie zwracać tysięcy wyników
            .map((item) => ({
                symbol: item.symbol,
                name: item.description,
                type: item.description.toUpperCase().includes('ETF')
                    ? 'ETF'
                    : 'STOCK',
            }));

        // Zbiór nazw (nie symboli!) już zajętych przez stocks
        // ETH jako symbol może być stockiem, ale "Ethereum" nazwą nie
        const stockNames = new Set(stocks.map((s) => s.name.toLowerCase()));

        const cryptos = ((cryptoData.coins as any[]) || [])
            .filter((coin) => {
                // Odfiltruj tylko jeśli nazwa się pokrywa — nie symbol
                return !stockNames.has(coin.name.toLowerCase());
            })
            .slice(0, 20)
            .map((coin) => ({
                symbol: coin.symbol.toUpperCase(),
                name: coin.name,
                type: 'CRYPTO',
                cryptoId: coin.id, // zmień z id → cryptoId żeby pasowało do fetchAssetPrice
            }));

        return NextResponse.json([...stocks, ...cryptos]);
    } catch (err) {
        console.error(err);
        return NextResponse.json([]);
    }
}
