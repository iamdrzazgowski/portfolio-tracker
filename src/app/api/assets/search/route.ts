import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q')?.toLowerCase();

    try {
        const stockRes = await fetch(
            `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${process.env.STOCK_API_KEY}`,
            { cache: 'no-store' },
        );
        const stockData = await stockRes.json();

        const stocks = stockData
            .filter(
                (item: any) =>
                    !q ||
                    item.symbol.toLowerCase().includes(q) ||
                    item.description.toLowerCase().includes(q),
            )
            .map((item: any) => ({
                symbol: item.symbol,
                name: item.description,
                type: item.description.toUpperCase().includes('ETF')
                    ? 'ETF'
                    : 'STOCK',
            }));

        const existingSymbols = new Set(stocks.map((s) => s.symbol));

        const cryptoRes = await fetch(
            `https://api.coingecko.com/api/v3/search?query=${q || ''}`,
            { cache: 'no-store' },
        );
        const cryptoData = await cryptoRes.json();

        const cryptos = (cryptoData.coins || [])
            .filter(
                (coin: any) => !existingSymbols.has(coin.symbol.toUpperCase()),
            )
            .map((coin: any) => ({
                symbol: coin.symbol.toUpperCase(),
                name: coin.name,
                type: 'CRYPTO',
                id: coin.id,
            }));

        return NextResponse.json([...stocks, ...cryptos]);
    } catch (err) {
        console.error(err);
        return NextResponse.json([]);
    }
}
