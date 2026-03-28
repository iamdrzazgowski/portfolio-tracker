import { portfolioRepository } from '../repositories/portfolio.repository';

export async function createPortfolio(data: {
    name: string;
    description?: string;
    userId: string;
}) {
    const { name, userId } = data;

    if (!name || name.trim().length === 0) {
        throw new Error('Portfolio name is required');
    }

    if (!userId) {
        throw new Error('User ID is required');
    }

    const portfolio = await portfolioRepository.create({
        ...data,
        name: name.trim(),
    });

    if (!portfolio) throw new Error('Failed to create portfolio');

    return portfolio;
}

export async function deletePortfolio(data: {
    portfolioId: string;
    userId: string;
}) {
    const { portfolioId, userId } = data;

    if (!portfolioId) throw new Error('Portfolio ID is required');

    if (!userId) throw new Error('User ID is required');

    const result = await portfolioRepository.delete(data);

    return result;
}

export async function updatePortfolio(data: {
    id: string;
    name: string;
    description?: string;
    userId: string;
}) {
    const { id, name, userId } = data;

    if (!id) {
        throw new Error('Portfolio ID is required');
    }

    if (!name || name.trim().length === 0) {
        throw new Error('Portfolio name is required');
    }

    if (!userId) {
        throw new Error('User ID is required');
    }

    const portfolio = await portfolioRepository.update({
        ...data,
        name: name.trim(),
    });

    if (!portfolio) {
        throw new Error('Failed to update portfolio');
    }

    return portfolio;
}

export async function getUserPortfolios(userId: string) {
    const portfolios = await portfolioRepository.getUserPortfolios(userId);

    return portfolios.map((portfolio) => {
        const assets = portfolio.assets;
        const assetsCount = assets.length;

        const lastUpdated = portfolio.updatedAt;
        let totalInvested = 0;
        let currentValue = 0;

        for (const asset of assets) {
            // Ile akcji faktycznie posiadamy (BUY - SELL)
            const quantity = asset.transactions.reduce((sum, t) => {
                return t.type === 'BUY' ? sum + t.quantity : sum - t.quantity;
            }, 0);

            // Średnia cena zakupu (weighted average)
            const buyTransactions = asset.transactions.filter(
                (t) => t.type === 'BUY',
            );
            const totalBuyValue = buyTransactions.reduce(
                (sum, t) => sum + t.quantity * t.price,
                0,
            );
            const totalBuyQuantity = buyTransactions.reduce(
                (sum, t) => sum + t.quantity,
                0,
            );
            const avgBuyPrice =
                totalBuyQuantity > 0 ? totalBuyValue / totalBuyQuantity : 0;

            // Aktualna cena (lastPrice z giełdy lub ostatnia cena transakcji jako fallback)
            const currentPrice =
                asset.lastPrice ?? asset.transactions.at(-1)?.price ?? 0;

            totalInvested += avgBuyPrice * quantity;
            currentValue += currentPrice * quantity;
        }

        const change =
            totalInvested > 0
                ? Number(
                      (
                          ((currentValue - totalInvested) / totalInvested) *
                          100
                      ).toFixed(2),
                  )
                : 0;

        return {
            id: portfolio.id,
            name: portfolio.name,
            description: portfolio.description ?? undefined,
            assets: assetsCount,
            lastUpdated: lastUpdated ? lastUpdated.toISOString() : '',
            totalValue: Number(currentValue.toFixed(2)),
            totalInvested: Number(totalInvested.toFixed(2)),
            change,
        };
    });
}
