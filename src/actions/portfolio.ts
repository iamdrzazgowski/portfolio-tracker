'use server';

import { auth } from '@/lib/auth';
import {
    createPortfolio,
    getUserPortfolios,
    updatePortfolio,
} from '@/lib/services/portfolio.service';
import { headers } from 'next/headers';

export async function createPortfolioAction(data: {
    name: string;
    description?: string;
}) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        throw new Error('No active session!');
    }

    const portfolio = await createPortfolio({
        ...data,
        userId: session.user.id,
    });

    console.log(portfolio);

    return {
        success: true,
        data: portfolio,
    };
}

export async function updatePortfolioAction(data: {
    id: string;
    name: string;
    description?: string;
}) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        throw new Error('No active session!');
    }

    const portfolio = await updatePortfolio({
        ...data,
        userId: session.user.id,
    });

    return {
        success: true,
        data: portfolio,
    };
}

export async function getPortfolios() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        throw new Error('No active session!');
    }

    const portfolios = await getUserPortfolios(session.user.id);

    return portfolios;
}
