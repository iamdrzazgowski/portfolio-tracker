import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
    const result = await auth.api.getSession(request);

    if (!result?.session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!login|signup|_next|favicon.ico|api).*)'],
};
