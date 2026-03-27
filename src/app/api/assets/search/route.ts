import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');

    if (!q) return NextResponse.json([]);

    try {
        const stockRes = await fetch(
            `https://finnhub.io/api/v1/search?q=${q}&token=${process.env.STOCK_API_KEY}`,
            { cache: 'no-store' },
        );

        const stockData = await stockRes.json();

        const stocks = (stockData.result || [])
            .filter((item: any) => item.symbol && item.description)
            .map((item: any) => ({
                symbol: item.symbol,
                name: item.description,
                type: item.description.includes('ETF') ? 'ETF' : 'STOCK',
            }));

        const cryptoRes = await fetch(
            `https://api.coingecko.com/api/v3/search?query=${q}`,
            { cache: 'no-store' },
        );

        const cryptoData = await cryptoRes.json();

        const cryptos = (cryptoData.coins || []).map((coin: any) => ({
            symbol: coin.symbol.toUpperCase(),
            name: coin.name,
            type: 'CRYPTO',
            id: coin.id,
        }));

        return NextResponse.json([...stocks, ...cryptos].slice(0, 10));
    } catch (err) {
        return NextResponse.json([]);
    }
}
