export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const symbol = searchParams.get("symbol");
    const type = searchParams.get("type");
    const cryptoId = searchParams.get("cryptoId");
    const finnhubApiKey =
        process.env.STOCK_API_KEY ?? process.env.STOCK_API_KEY;

    try {
        if (type === "STOCK" || type === "ETF") {
            if (!symbol || !finnhubApiKey) {
                return Response.json({ price: null });
            }

            const res = await fetch(
                `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${finnhubApiKey}`,
            );
            const data = await res.json();

            return Response.json({ price: data.c });
        }

        if (type === "CRYPTO" && cryptoId) {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd`,
            );
            const data = await res.json();

            return Response.json({
                price: data[cryptoId]?.usd ?? null,
            });
        }

        return Response.json({ price: null });
    } catch {
        return Response.json({ price: null });
    }
}
