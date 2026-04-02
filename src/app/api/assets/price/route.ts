import { fetchAssetPrice } from '@/lib/fetchAssetPrice';
type AssetType = 'STOCK' | 'ETF' | 'CRYPTO';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const symbol = searchParams.get('symbol') ?? '';
    const type = searchParams.get('type') as AssetType;
    const cryptoId = searchParams.get('cryptoId') ?? null;

    const price = await fetchAssetPrice({ symbol, type, cryptoId });

    return Response.json({ price });
}
