'use server';

import { auth } from '@/lib/auth';
import { getUserSnapshots } from '@/lib/services/snapshot.service';
import { headers } from 'next/headers';

export async function getUserSnapshotsAction() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return { success: false, error: 'Unauthorized' };

    const userSnapshots = await getUserSnapshots(session.user.id);

    if (!userSnapshots)
        throw new Error('Problem with getting user portfolio snapshots');

    return userSnapshots;
}
