import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { createPortfolioSnapshot } from './lib/services/snapshot.service';

export async function proxy(request: NextRequest) {
    const result = await auth.api.getSession(request);

    if (!result?.session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const userId = result.session.userId;

    try {
        await createPortfolioSnapshot(userId);
    } catch (err) {
        console.error('Snapshot failed: ', err);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!login|signup|_next|favicon.ico|api).*)'],
};
