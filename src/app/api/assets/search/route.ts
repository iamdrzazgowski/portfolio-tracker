import { searchAssets } from '@/lib/searchAssets';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') ?? '';
    const assets = await searchAssets(q);
    return Response.json(assets);
}
