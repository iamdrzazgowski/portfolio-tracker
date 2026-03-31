import { NextResponse } from 'next/server';
import { searchAssets } from '@/lib/searchAssets';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') ?? '';

    try {
        const data = await searchAssets(q);
        return NextResponse.json(data);
    } catch (err) {
        console.error(err);
        return NextResponse.json([]);
    }
}
