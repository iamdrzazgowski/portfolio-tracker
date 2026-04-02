'use server';

import { auth } from '@/lib/auth';
import { getUserAssets } from '@/lib/services/assets.service';
import { headers } from 'next/headers';

export async function getUserAssetsAction() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user?.id) throw new Error('No active session!');
    const assets = await getUserAssets(session.user.id);

    if (!assets) throw new Error('No assets found');

    return assets;
}
