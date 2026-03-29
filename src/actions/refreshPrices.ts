'use server';

import prisma from '@/lib/prisma';
import { fetchAssetPrice } from '@/lib/prices/fetchAssetPrice';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function refreshPrices() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return;

    const assets = await prisma.asset.findMany({
        where: { portfolio: { userId: session.user.id } },
    });

    for (const asset of assets) {
        const price = await fetchAssetPrice(asset);

        if (price !== null) {
            await prisma.asset.update({
                where: { id: asset.id },
                data: { lastPrice: price, lastPriceAt: new Date() },
            });
        }
        await new Promise((res) => setTimeout(res, 200));
    }
}
