export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const symbol = searchParams.get('symbol');
    const type = searchParams.get('type');
    const cryptoId = searchParams.get('cryptoId');

    try {
        if (type === 'STOCK' || type === 'ETF') {
            const res = await fetch(
                `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`,
                { cache: 'no-store' },
            );
            const data = await res.json();

            return Response.json({ price: data.c });
        }

        if (type === 'CRYPTO' && cryptoId) {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd`,
                { cache: 'no-store' },
            );
            const data = await res.json();

            return Response.json({
                price: data[cryptoId]?.usd ?? null,
            });
        }

        return Response.json({ price: null });
    } catch (e) {
        return Response.json({ price: null });
    }
}
