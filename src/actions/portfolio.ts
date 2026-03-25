'use server';

import { auth } from '@/lib/auth';
import { createPortfolio } from '@/lib/services/portfolio.service';
import { headers } from 'next/headers';

export async function createPortoflioAction(data: {
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
