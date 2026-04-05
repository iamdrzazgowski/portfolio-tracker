import { snapshotRepository } from '../repositories/snapshot.repository';
import { transactionRepository } from '../repositories/transaction.repository';

export async function createPortfolioSnapshot(userId: string) {
    const now = new Date();

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    try {
        const existing = await snapshotRepository.findFirst(userId, monthStart);

        if (existing) {
            return { status: 'skipped' };
        }

        const transactions =
            await transactionRepository.findManyByUserId(userId);

        const assetMap = new Map<
            string,
            { quantity: number; invested: number }
        >();

        for (const tx of transactions) {
            const current = assetMap.get(tx.asset.id) || {
                quantity: 0,
                invested: 0,
            };

            if (tx.type === 'BUY') {
                current.quantity += tx.quantity;
                current.invested += tx.quantity * tx.price;
            } else if (tx.type === 'SELL') {
                current.quantity -= tx.quantity;
                current.invested -= tx.quantity * tx.price;
            }

            assetMap.set(tx.asset.id, current);
        }

        let totalValue = 0;
        let invested = 0;

        for (const [
            assetId,
            { quantity, invested: assetInvested },
        ] of assetMap) {
            const asset = transactions.find(
                (t) => t.asset.id === assetId,
            )?.asset;
            const price = asset?.lastPrice || 0;
            totalValue += quantity * price;
            invested += assetInvested;
        }

        const profit = totalValue - invested;

        await snapshotRepository.create({
            userId,
            date: monthStart,
            totalValue,
            invested,
            profit,
        });

        return { status: 'created' };
    } catch (err: any) {
        if (err.code === 'P2002') return { status: 'skipped' };
        throw err;
    }
}

export async function getUserSnapshots(userId: string) {
    if (!userId) throw new Error('Missing userID');

    const userSnapshots = await snapshotRepository.getUserSnapshots(userId);

    if (!userSnapshots) throw new Error('Problem with get user snapshots');

    return userSnapshots;
}
