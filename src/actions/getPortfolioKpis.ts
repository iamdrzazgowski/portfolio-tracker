'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function getPortfolioKpis() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return null;

    const portfolios = await prisma.portfolio.findMany({
        where: { userId: session.user.id },
        include: {
            assets: {
                include: { transactions: true },
            },
        },
    });

    let totalValue = 0;
    let totalInvested = 0;

    for (const portfolio of portfolios) {
        for (const asset of portfolio.assets) {
            let buyQty = 0,
                sellQty = 0;
            let buyCost = 0,
                sellCost = 0;

            for (const tx of asset.transactions) {
                if (tx.type === 'BUY') {
                    buyQty += tx.quantity;
                    buyCost += tx.quantity * tx.price;
                } else {
                    sellQty += tx.quantity;
                    sellCost += tx.quantity * tx.price;
                }
            }

            const currentQty = buyQty - sellQty;
            const invested = buyCost - sellCost;
            const price = asset.lastPrice ?? 0;

            totalInvested += invested;
            totalValue += currentQty * price;
        }
    }

    return {
        totalValue,
        totalInvested,
        totalPL: totalValue - totalInvested,
    };
}
