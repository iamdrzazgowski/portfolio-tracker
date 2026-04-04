'use server';

import prisma from '@/lib/prisma';
import { fetchAssetPrice } from '@/lib/fetchAssetPrice';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function refreshPrices() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return;

    const assets = await prisma.asset.findMany({
        where: { portfolio: { userId: session.user.id } },
        select: { id: true, symbol: true, type: true, cryptoId: true },
    });

    for (const asset of assets) {
        const price = await fetchAssetPrice({
            symbol: asset.symbol,
            type: asset.type as 'STOCK' | 'ETF' | 'CRYPTO',
            cryptoId: asset.cryptoId ?? undefined,
        });

        if (price !== null) {
            await prisma.asset.update({
                where: { id: asset.id },
                data: { lastPrice: price, lastPriceAt: new Date() },
            });
        } else {
            console.warn(`Price not found for ${asset.symbol}`);
        }

        await new Promise((res) => setTimeout(res, 200));
    }
}
